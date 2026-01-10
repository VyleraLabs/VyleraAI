'use client'

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { useGLTF, useAnimations, Preload } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useLivingBreathing } from '../../hooks/useLivingBreathing'
import { useLipSync } from '../../hooks/useLipSync'

export interface AvatarHandle {
    speak: (text: string, lang?: string) => Promise<void>;
    playAudioBlob: (blob: Blob) => Promise<void>;
    stop: () => void;
}

export interface MetiAvatarProps {
    onCrash?: () => void;
}

const MetiAvatar = forwardRef<AvatarHandle, MetiAvatarProps>(({ onCrash }, ref) => {
    // Loader
    const { nodes, animations, scene } = useGLTF('/models/meti_full.glb') as any
    const { actions, mixer } = useAnimations(animations, scene)

    // State
    const [isActive, setIsActive] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    // Lip Sync Hook
    const { playAudioBlob, stop: stopAudio, updateLipSync, isSpeaking } = useLipSync()

    const stop = () => {
        stopAudio();
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }

    // Expose Handle
    useImperativeHandle(ref, () => ({
        speak: async (text: string, lang?: string) => {
            // Abort previous
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            const controller = new AbortController();
            abortControllerRef.current = controller;

            try {
                const res = await fetch('/api/tts', {
                    method: 'POST',
                    body: JSON.stringify({ text, lang }),
                    signal: controller.signal
                })
                if (!res.ok) throw new Error('TTS Failed')
                const blob = await res.blob()

                if (controller.signal.aborted) return;

                await playAudioBlob(blob);

            } catch (e: any) {
                if (e.name !== 'AbortError') {
                    console.error('TTS/Playback Error:', e)
                }
                stop();
            }
        },
        playAudioBlob,
        stop
    }))

    // Cleanup Actions on unmount
    useEffect(() => {
        return () => {
            stop();
            mixer.stopAllAction();
        }
    }, [mixer])

    // Animation Sequence: Mount -> Hello -> Idle
    useEffect(() => {
        const helloClip = actions['hello'];
        if (helloClip) {
            helloClip.reset().fadeIn(0.5).setLoop(THREE.LoopOnce, 1).play();
            helloClip.clampWhenFinished = true;

            const onFinished = (e: any) => {
                if (e.action === helloClip) {
                    setIsActive(true); // Activate procedural idle
                }
            }
            mixer.addEventListener('finished', onFinished);

            return () => {
                mixer.removeEventListener('finished', onFinished);
            }
        } else {
            // If no hello animation, go straight to idle
            setIsActive(true);
        }
    }, [actions, mixer])

    // Task 1: Procedural Idle (Living Breathing)
    useLivingBreathing(nodes, isActive);

    // Frame Loop
    useFrame((state, delta) => {
        try {
            // Task 2: Lip Sync Integration (Crucial)
            // The avatar must speak via ElevenLabs.
            // Placeholder/Integration: connecting useLipSync to Face Mesh

            const faceMesh = nodes.Face || nodes.Body || nodes.mesh_0; // Attempt to find Face mesh

            if (faceMesh && faceMesh.morphTargetDictionary && faceMesh.morphTargetInfluences) {
                // Create a proxy VRM object that maps 'aa', 'ih', 'ou' to the mesh's morph targets
                // This allows us to reuse the existing useLipSync logic which expects a vrm object
                const proxyVRM = {
                    expressionManager: {
                        setValue: (name: string, value: number) => {
                            const idx = faceMesh.morphTargetDictionary[name];
                            if (idx !== undefined) {
                                faceMesh.morphTargetInfluences[idx] = value;
                            }
                        }
                    }
                };

                updateLipSync(proxyVRM, delta);
            }

        } catch (e) {
            console.error("Avatar Render Crash:", e);
            if (onCrash) onCrash();
        }
    })

    return (
        <group dispose={null}>
            <primitive object={scene} />
            <Preload all />
        </group>
    )
})

MetiAvatar.displayName = 'MetiAvatar'

export default MetiAvatar
