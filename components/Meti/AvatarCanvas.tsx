'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useProgress, Html, useAnimations } from '@react-three/drei'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useEffect, useState, useRef, Suspense, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three-stdlib'

export interface AvatarHandle {
    speak: (text: string, lang?: string) => Promise<void>;
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

  useEffect(() => {
    // Fixed camera position (Updated to Z: 2.1)
    camera.position.set(0, 1.4, 2.1)
    // Target: Face center
    camera.lookAt(0, 1.35, 0)
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
  const [animations, setAnimations] = useState<THREE.AnimationClip[]>([]);
  const isMountedRef = useRef(true);

  useEffect(() => {
      isMountedRef.current = true;
      return () => { isMountedRef.current = false; };
  }, []);

  useEffect(() => {
    if (!isMountedRef.current) return;
    const loader = new FBXLoader();
    const animConfig = [
        { name: 'HappyIdle', path: '/animations/HappyIdle.fbx' },
        { name: 'Happy', path: '/animations/Happy.fbx' },
        { name: 'Bashful', path: '/animations/Bashful.fbx' },
        { name: 'Bored', path: '/animations/Bored.fbx' },
        { name: 'Talking', path: '/animations/Talking.fbx' },
        { name: 'Talking1', path: '/animations/Talking1.fbx' },
        { name: 'LookAround', path: '/animations/LookAround.fbx' },
        { name: 'SalsaDancing', path: '/animations/SalsaDancing.fbx' },
        { name: 'DancingMaraschinoStep', path: '/animations/DancingMaraschinoStep.fbx' },
    ];

    const loadPromises = animConfig.map((config) => {
        return new Promise<THREE.AnimationClip | null>((resolve) => {
            loader.load(
                config.path,
                (fbx) => {
                    if (fbx.animations && fbx.animations.length > 0) {
                        const clip = fbx.animations[0];
                        clip.name = config.name;
                        resolve(clip);
                    } else {
                        resolve(null);
                    }
                },
                undefined,
                (err) => {
                    console.warn(`[Avatar] Failed to load animation: ${config.path}. Defaulting to safe pose.`, err);
                    resolve(null); // Silent fail
                }
            );
        });
    });

    Promise.all(loadPromises).then((results) => {
        if (!isMountedRef.current) return;
        const validClips = results.filter((clip): clip is THREE.AnimationClip => clip !== null);
        setAnimations(validClips);
    });
  }, []); // Run once on mount

  // Use Animations on the VRM scene
  const { actions } = useAnimations(animations, gltf.scene);

  // Animation Logic
  useEffect(() => {
     if (!actions || Object.keys(actions).length === 0) return;

     const idleAnims = ['HappyIdle', 'Happy', 'Bashful', 'Bored'];
     const talkingAnims = ['Talking', 'Talking1'];
     const thinkingAnim = 'LookAround';

     // Filter available animations
     const availableIdles = idleAnims.filter(name => actions[name]);
     const availableTalks = talkingAnims.filter(name => actions[name]);
     const hasThinking = actions[thinkingAnim];

     let currentAction: any = null;
     let timeoutId: NodeJS.Timeout;

     const play = (name: string) => {
         const newAction = actions[name];
         if (currentAction && currentAction !== newAction) {
             currentAction.fadeOut(0.5);
         }
         if (newAction) {
             newAction.reset().fadeIn(0.5).play();
             currentAction = newAction;
         }
     };

     if (isThinking && hasThinking) {
         play(thinkingAnim);
     } else if (isSpeaking && availableTalks.length > 0) {
         const randomTalk = availableTalks[Math.floor(Math.random() * availableTalks.length)];
         play(randomTalk);
     } else if (availableIdles.length > 0) {
         // Idles
         const cycleIdle = () => {
             if (isThinking || isSpeaking) return;
             const randomIdle = availableIdles[Math.floor(Math.random() * availableIdles.length)];
             play(randomIdle);
             timeoutId = setTimeout(cycleIdle, 10000);
         };
         cycleIdle();
     }

     return () => {
         clearTimeout(timeoutId);
         if (currentAction) currentAction.fadeOut(0.5);
     };

  }, [isSpeaking, isThinking, actions, animations]); // Dependent on animations loaded

  // Blink State
  const blinkRef = useRef({
    nextBlinkTime: 0,
    isBlinking: false,
    blinkStartTime: 0,
    duration: 0.15 // Duration of a blink
  })

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
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)

      audio.onplay = () => {
          if (controller.signal.aborted) {
              audio.pause();
              return;
          }
          setIsSpeaking(true)
      };
      audio.onended = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(url)
      }

      // Prevent flood error here too just in case
      audio.play().catch(e => {
         if (e.name !== 'AbortError' && e.message.indexOf('interrupted') === -1) {
             console.error('Audio Play Error in Avatar:', e);
         }
      })

      // Hook up abort signal to stop audio if it happens after fetch
      controller.signal.addEventListener('abort', () => {
          audio.pause();
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
          // Reset blend shapes
          if (vrm && vrm.expressionManager) {
              vrm.expressionManager.setValue('aa', 0);
          }
      });

    } catch (e: any) {
      if (e.name !== 'AbortError') {
          console.error(e)
      }
      setIsSpeaking(false)
      // Reset blend shapes on error
      if (vrm && vrm.expressionManager) {
          vrm.expressionManager.setValue('aa', 0);
      }
    }
  }

  useImperativeHandle(ref, () => ({
    speak
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
    if (vrm) {
      vrm.update(delta)
      const t = state.clock.elapsedTime

      // Lip Sync
      if (vrm.expressionManager) {
         if (isSpeaking) {
             const val = Math.max(0, Math.sin(t * 25) * 0.5)
             vrm.expressionManager.setValue('aa', val)
         } else {
             vrm.expressionManager.setValue('aa', 0)
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
