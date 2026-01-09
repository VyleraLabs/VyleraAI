'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useProgress, Html } from '@react-three/drei'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useEffect, useState, useRef, Suspense, forwardRef, useImperativeHandle } from 'react'
import * as THREE from 'three'
import { useLipSync } from '../../hooks/useLipSync'

export interface AvatarHandle {
    speak: (text: string, lang?: string) => Promise<void>;
    playAudioBlob: (blob: Blob) => Promise<void>;
    stop: () => void;
}

export interface AvatarProps {
  isThinking?: boolean;
  onCrash?: () => void;
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

const Avatar = forwardRef<AvatarHandle, AvatarProps>(({ isThinking, onCrash }, ref) => {
  const [vrm, setVrm] = useState<any>(null)
  const abortControllerRef = useRef<AbortController | null>(null);

  const gltf = useGLTF('/models/meti.vrm', undefined, undefined, (loader) => {
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser as any) as any
    })
  })

  // Audio / Lip Sync Hook
  const { playAudioBlob, stop, updateLipSync, isSpeaking } = useLipSync();

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
      stop();
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

          // Lip Sync Update using the Hook logic (includes lerp/smoothing)
          updateLipSync(vrm, delta);

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


          // 4. Thinking Expression (Joy)
          if (vrm.expressionManager) {
            // Map isThinking to a subtle "Joy" morph to simulate neural activity
            const targetJoy = isThinking ? 0.3 : 0;
            const currentJoy = vrm.expressionManager.getValue('joy') || 0;
            // Smoothly interpolate joy expression
            const smoothedJoy = THREE.MathUtils.lerp(currentJoy, targetJoy, 0.1);
            vrm.expressionManager.setValue('joy', smoothedJoy);
          }

      } // End if(vrm)
    } catch (renderError) {
        // Critical Failure Recovery: Stop the animation loop to save the CPU/GPU
        console.error("CRITICAL RENDER FAILURE:", renderError);
        state.gl.setAnimationLoop(null);
        if (onCrash) onCrash();
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
  const [key, setKey] = useState(0); // Key for remounting on crash
  const [hasCrashed, setHasCrashed] = useState(false);

  // Crash Recovery Handler
  // Task 4: Resolve WebGL Crash & Bone Mapping (Safety: Wrap in try/catch... wait 2 seconds and re-initialize)
  const handleCrash = () => {
      if (hasCrashed) return; // Prevent multiple triggers
      setHasCrashed(true);

      console.log("WebGL Context Lost. Attempting to reboot Neural Core in 2 seconds...");

      setTimeout(() => {
          setHasCrashed(false);
          setKey(prev => prev + 1); // Remount component to re-initialize WebGL context/canvas
      }, 2000);
  };

  if (hasCrashed) {
      return (
          <div className="flex items-center justify-center w-full h-full">
               <div className="text-emerald-400 font-mono text-sm animate-pulse">
                   SYSTEM REBOOTING...
               </div>
          </div>
      )
  }

  return (
    <Canvas
      key={key}
      camera={{ fov: 30 }}
      gl={{
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance"
      }}
      // CRITICAL: This disposes of everything when the component unmounts
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          console.warn('Meti: Context Lost - Attempting Restore');
          handleCrash();
        });
      }}
    >
        <CameraRig />

        {/* Studio Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={2.0} />
        <spotLight position={[-5, 5, 10]} intensity={2} />

        <Suspense fallback={<Loader />}>
            <Avatar ref={ref} {...props} onCrash={handleCrash} />
        </Suspense>
    </Canvas>
  )
})

AvatarCanvas.displayName = 'AvatarCanvas'

export default AvatarCanvas
