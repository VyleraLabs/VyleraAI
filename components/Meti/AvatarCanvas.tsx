'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useProgress, Html, useAnimations } from '@react-three/drei'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useEffect, useState, useRef, Suspense, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { useMetiAnimations } from '../../hooks/useMetiAnimations'

export interface AvatarHandle {
    speak: (text: string, lang?: string) => Promise<void>;
    playAudioBlob: (blob: Blob) => Promise<void>;
    stop: () => void;
}

export interface AvatarProps {
  isThinking?: boolean;
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center zIndexRange={[100, 0]}>
      <div className="text-white text-sm font-mono tracking-widest whitespace-nowrap">
        NEURAL CORE LOADING... {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

function CameraRig() {
  const { camera } = useThree()

  // Task 3: MCU Camera Lock
  // Ensure strict compliance with Z=2.1 and Head LookAt
  useEffect(() => {
    // Force reset position to ensure frame
    camera.position.set(0, 1.4, 2.1)

    // Lock LookAt to Head Bone center (approx 1.35m height)
    const target = new THREE.Vector3(0, 1.35, 0)
    camera.lookAt(target)

    // Explicitly update matrices to prevent drift
    camera.updateProjectionMatrix()
  }, [camera])

  return null
}

const Avatar = forwardRef<AvatarHandle, AvatarProps>(({ isThinking }, ref) => {
  const [vrm, setVrm] = useState<any>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null);

  const gltf = useGLTF('/models/meti.vrm', undefined, undefined, (loader) => {
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser as any) as any
    })
  })

  // --- SAFE ANIMATION LOADING ---
  // Replaces direct useFBX calls to prevent crashes on missing files
  // Now handled by custom hook with bone normalization
  const { animations } = useMetiAnimations(gltf.animations, gltf.scene);

  // Use Animations on the VRM scene
  const { actions } = useAnimations(animations, gltf.scene);

  // Animation Logic
  useEffect(() => {
     if (!actions || Object.keys(actions).length === 0 || animations.length === 0) return;

     // Zero-Failure: Use exact indices from internal clips
     // Idle: Play animations[0] (Standby 1)
     // Talking: Play animations[3] (Standby 4) while audio is active

     let currentAction: any = null;

     // Helper to play action by clip name
     const playAction = (clipName: string) => {
         const newAction = actions[clipName];
         if (currentAction && currentAction !== newAction) {
             currentAction.fadeOut(0.5);
         }
         if (newAction) {
             newAction.reset().fadeIn(0.5).play();
             currentAction = newAction;
         }
     };

     if (isSpeaking) {
         // Talking: animations[3]
         if (animations[3]) {
             playAction(animations[3].name);
         }
     } else {
         // Idle: animations[0]
         if (animations[0]) {
             playAction(animations[0].name);
         }
     }

     return () => {
         if (currentAction) currentAction.fadeOut(0.5);
     };

  }, [isSpeaking, isThinking, actions, animations]);

  // Blink State
  const blinkRef = useRef({
    nextBlinkTime: 0,
    isBlinking: false,
    blinkStartTime: 0,
    duration: 0.15 // Duration of a blink
  })

  // Audio Analyzer Ref
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const dataArrayRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current = null;
    }
    if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
    }
    setIsSpeaking(false);
    // Reset blend shapes
    if (vrm && vrm.expressionManager) {
        vrm.expressionManager.setValue('Fcl_MTH_A', 0);
        vrm.expressionManager.setValue('Fcl_MTH_I', 0);
        vrm.expressionManager.setValue('Fcl_MTH_O', 0);
    }
  };

  const playAudioBlob = async (blob: Blob): Promise<void> => {
    stop(); // Stop any currently playing audio

    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;

    return new Promise<void>((resolve, reject) => {
        audio.onplay = () => {
            setIsSpeaking(true);

            // Setup Audio Analysis for Lip Sync
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;

            if(ctx.state === 'suspended') {
                ctx.resume();
            }

            if (sourceRef.current) {
                sourceRef.current.disconnect();
            }

            const analyser = ctx.createAnalyser();
            analyser.fftSize = 512; // Moderate resolution
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            // Explicitly cast ArrayBuffer to avoid Type error with Uint8Array vs Uint8Array<ArrayBuffer>
            dataArrayRef.current = new Uint8Array(new ArrayBuffer(bufferLength));

            try {
                const source = ctx.createMediaElementSource(audio);
                source.connect(analyser);
                analyser.connect(ctx.destination);
                sourceRef.current = source;
            } catch(e) {
                console.warn("MediaElementSource connection failed (already connected?)", e);
            }
        };

        audio.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(url);
            if (sourceRef.current) {
                sourceRef.current.disconnect();
                sourceRef.current = null;
            }
            audioRef.current = null;
            resolve();
        };

        audio.onerror = (e) => {
            setIsSpeaking(false);
            URL.revokeObjectURL(url);
            console.error("Audio playback error", e);
            reject(e);
        };

        audio.play().catch(e => {
            if (e.message.indexOf('interrupted') === -1) {
                console.error("Play failed", e);
                reject(e);
            } else {
                resolve(); // Treat interruption as done
            }
        });
    });
  };

  const speak = async (text: string, lang?: string) => {
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
          console.error(e)
      }
      setIsSpeaking(false)
    }
  }

  useImperativeHandle(ref, () => ({
    speak,
    playAudioBlob,
    stop
  }));

  // LookAt Target
  const lookAtTarget = useRef(new THREE.Object3D())

  useEffect(() => {
    if (gltf.userData.vrm) {
      const vrmInstance = gltf.userData.vrm
      VRMUtils.rotateVRM0(vrmInstance)

      // Assign LookAt Target
      if (vrmInstance.lookAt) {
        vrmInstance.lookAt.target = lookAtTarget.current
      }

      setVrm(vrmInstance)
    }
  }, [gltf])

  useFrame((state, delta) => {
    // GPU Shield: Wrap the ENTIRE render/update loop in a try/catch block
    // to prevent WebGL Context Lost from crashing the whole app.
    try {
        if (vrm) {
          vrm.update(delta)

          const t = state.clock.elapsedTime

          // Lip Sync (Frequency Analysis)
          if (vrm.expressionManager) {
             if (isSpeaking && analyserRef.current && dataArrayRef.current) {
                 // GPU Shield: Wrap analyser.getByteFrequencyData
                 try {
                     analyserRef.current.getByteFrequencyData(dataArrayRef.current);

                     // Task 4: Real-Time Lip Sync Mapping (Zero-Failure)
                     // Direct mapping of frequency bands to requested Viseme targets
                     // Low -> 'oo' (Fcl_MTH_O)
                     // Mid -> 'aa' (Fcl_MTH_A)
                     // High -> 'ee' (Fcl_MTH_I)

                     const bufferLength = analyserRef.current.frequencyBinCount;
                     // Sample Rate is usually 44100 or 48000
                     // fftSize 512 -> 256 bins.
                     // binWidth = sampleRate / 512. Approx 86Hz per bin (at 44.1k)

                     // Low: Bins 0-4 (~0-350Hz)
                     let lowSum = 0;
                     for(let i=0; i<4; i++) lowSum += dataArrayRef.current[i];
                     const lowAvg = lowSum / 4;

                     // Mid: Bins 4-20 (~350-1700Hz)
                     let midSum = 0;
                     for(let i=4; i<20; i++) midSum += dataArrayRef.current[i];
                     const midAvg = midSum / 16;

                     // High: Bins 20-100 (~1700-8600Hz)
                     let highSum = 0;
                     for(let i=20; i<100; i++) highSum += dataArrayRef.current[i];
                     const highAvg = highSum / 80;

                     // Normalize (0-255 -> 0-1) and apply sensitivity
                     const sensitivity = 2.5; // Boost values
                     // Mapping to specific Viseme targets
                     const viseme_oo = Math.min(1, (lowAvg / 255) * sensitivity);
                     const viseme_aa = Math.min(1, (midAvg / 255) * sensitivity);
                     const viseme_ee = Math.min(1, (highAvg / 255) * sensitivity);

                     // Apply smoothing or direct? Direct for responsiveness.
                     vrm.expressionManager.setValue('Fcl_MTH_O', viseme_oo); // oo
                     vrm.expressionManager.setValue('Fcl_MTH_A', viseme_aa); // aa
                     vrm.expressionManager.setValue('Fcl_MTH_I', viseme_ee); // ee

                 } catch (analyserError) {
                     // Reset on error
                     vrm.expressionManager.setValue('Fcl_MTH_O', 0);
                     vrm.expressionManager.setValue('Fcl_MTH_A', 0);
                     vrm.expressionManager.setValue('Fcl_MTH_I', 0);
                     console.warn("Audio analysis interrupted:", analyserError);
                 }

             } else {
                 vrm.expressionManager.setValue('Fcl_MTH_O', 0);
                 vrm.expressionManager.setValue('Fcl_MTH_A', 0);
                 vrm.expressionManager.setValue('Fcl_MTH_I', 0);
             }
          }

          // 1. Initial Pose (Arms down ~75 deg)
          // 75 degrees is approx 1.3 radians
          const leftArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm')
          const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')
          if (leftArm) leftArm.rotation.z = -1.3
          if (rightArm) rightArm.rotation.z = 1.3

          // 2. Breathing (Sine wave on Spine)
          const spine = vrm.humanoid.getNormalizedBoneNode('spine')
          if (spine) {
            spine.rotation.x = Math.sin(t * 2.0) * 0.05 // Subtle chest heave
          }

          // 3. Advanced Tracking
          // Mouse position: state.pointer.x/y (-1 to 1)
          const mouseX = state.pointer.x * 0.2 // Reduced sensitivity, Positive tracking
          const mouseY = state.pointer.y * 0.2 // Reduced sensitivity

          // Eyes - Use VRM LookAt for correct depth convergence
          // Update the shared target object position
          lookAtTarget.current.position.set(
              mouseX,
              mouseY + 1.35, // Adjust for eye height (approx 1.35m)
              4.0
          )

          // Helper to rotate bone towards cursor
          // Y rotation is horizontal (looking left/right) -> corresponds to mouse X
          // X rotation is vertical (looking up/down) -> corresponds to mouse Y
          const track = (boneName: string, multiplier: number, clampX?: number, clampY?: number) => {
            const bone = vrm.humanoid.getNormalizedBoneNode(boneName)
            if (bone) {
              // Target rotations
              let targetY = mouseX * multiplier
              let targetX = mouseY * multiplier

              // Clamp if limits are provided
              if (clampY) targetY = THREE.MathUtils.clamp(targetY, -clampY, clampY)
              if (clampX) targetX = THREE.MathUtils.clamp(targetX, -clampX, clampX)

              // Smoothly interpolate
              bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, targetY, 0.1)
              bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, targetX, 0.1)
            }
          }

          // Head (0.3)
          track('head', 0.3)

          // Neck (0.2)
          track('neck', 0.2)

          // UpperChest (0.1)
          track('upperChest', 0.1)


          // 4. Blinking (Random interval 2-4s)
          if (vrm.expressionManager) {
            const blink = blinkRef.current

            // Check if it's time to blink
            if (!blink.isBlinking && t > blink.nextBlinkTime) {
               blink.isBlinking = true
               blink.blinkStartTime = t
               // Set next blink time (current time + random between 2 and 4)
               blink.nextBlinkTime = t + 2 + Math.random() * 2
            }

            if (blink.isBlinking) {
               // Calculate blink progress (0 to 1 then back to 0) can be simple or bell curve
               // Simple implementation: fully closed for duration
               const progress = (t - blink.blinkStartTime) / blink.duration

               if (progress >= 1) {
                 blink.isBlinking = false
                 vrm.expressionManager.setValue('blink', 0)
               } else {
                 // Peak blink at 0.5 progress? Or just close/open.
                 // Let's do a sine wave for smooth blink
                 const blinkValue = Math.sin(progress * Math.PI)
                 vrm.expressionManager.setValue('blink', blinkValue)
               }
            }
          }

      } // End if(vrm)
    } catch (renderError) {
        // Critical Failure Recovery: Stop the animation loop to save the CPU/GPU
        console.error("CRITICAL RENDER FAILURE:", renderError);
        state.gl.setAnimationLoop(null);
    }
  })

  return (
    <group>
        <primitive object={gltf.scene} position={[0, 0, 0]} />
        <primitive object={lookAtTarget.current} />
    </group>
  )
})

Avatar.displayName = 'Avatar'

const AvatarCanvas = forwardRef<AvatarHandle, AvatarProps>((props, ref) => {
  return (
    <Canvas
      camera={{ fov: 30 }}
      gl={{ alpha: true }}
    >
        <CameraRig />

        {/* Studio Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.0} />
        <spotLight position={[-5, 5, 10]} intensity={2} />

        <Suspense fallback={<Loader />}>
            <Avatar ref={ref} {...props} />
        </Suspense>
    </Canvas>
  )
})

AvatarCanvas.displayName = 'AvatarCanvas'

export default AvatarCanvas
