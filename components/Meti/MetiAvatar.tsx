'use client'

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
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
    // Logic: Load /models/meti_full.glb
    const { nodes, animations, scene } = useGLTF('/models/meti_full.glb') as any
    const { actions, mixer } = useAnimations(animations, scene)

    // State
    const [isActive, setIsActive] = useState(false)
    const abortControllerRef = useRef<AbortController | null>(null)

    // Lip Sync Hook
    const { playAudioBlob, stop: stopAudio, updateLipSync } = useLipSync()

    // Handlers
    const stop = () => {
        stopAudio();
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }

    useImperativeHandle(ref, () => ({
        speak: async (text: string, lang?: string) => {
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

    // Cleanup
    useEffect(() => {
        return () => {
            stop();
            mixer.stopAllAction();
        }
    }, [mixer])

    // Logic: Play "hello" animation on mount (once), then switch isIdle state to true.
    useEffect(() => {
        const helloClip = actions['hello'];
        if (helloClip) {
            helloClip.reset().fadeIn(0.5).setLoop(THREE.LoopOnce, 1).play();
            helloClip.clampWhenFinished = true;

            const onFinished = (e: any) => {
                if (e.action === helloClip) {
                    setIsActive(true); // Switch to idle
                }
            }
            mixer.addEventListener('finished', onFinished);

            return () => {
                mixer.removeEventListener('finished', onFinished);
            }
        } else {
            // If no hello, start idle immediately
            setIsActive(true);
        }
    }, [actions, mixer])

    // Logic: Pass nodes to the hook.
    useLivingBreathing(nodes, isActive);

    // Frame Loop for Lip Sync (Optional but good for completeness if we keep speak)
    useFrame((state, delta) => {
        try {
           const faceMesh = nodes.Face || nodes.Body || nodes.mesh_0;
           if (faceMesh && faceMesh.morphTargetDictionary && faceMesh.morphTargetInfluences) {
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
            console.error("Avatar Frame Error:", e);
            if (onCrash) onCrash();
        }
    })

    // Logic: Return <primitive object={scene} position={[0, -1, 0]} />
    return (
        <primitive object={scene} position={[0, -1, 0]} />
    )
})

MetiAvatar.displayName = 'MetiAvatar'

export default MetiAvatar
