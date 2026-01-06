'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useProgress, Html } from '@react-three/drei'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useEffect, useState, useRef, Suspense } from 'react'
import * as THREE from 'three'

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
    // Fixed camera position
    camera.position.set(0, 1.4, 0.8)
    // Target: Face center
    camera.lookAt(0, 1.35, 0)
  }, [camera])

  return null
}

function Avatar() {
  const [vrm, setVrm] = useState<any>(null)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const gltf = useGLTF('/models/meti.vrm', undefined, undefined, (loader) => {
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser as any) as any
    })
  })

  // Blink State
  const blinkRef = useRef({
    nextBlinkTime: 0,
    isBlinking: false,
    blinkStartTime: 0,
    duration: 0.15 // Duration of a blink
  })

  const speak = async (text: string) => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        body: JSON.stringify({ text })
      })
      if (!res.ok) throw new Error('TTS Failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)

      audio.onplay = () => setIsSpeaking(true)
      audio.onended = () => {
        setIsSpeaking(false)
        URL.revokeObjectURL(url)
      }
      audio.play()
    } catch (e) {
      console.error(e)
      setIsSpeaking(false)
    }
  }

  useEffect(() => {
    if (gltf.userData.vrm) {
      const vrmInstance = gltf.userData.vrm
      VRMUtils.rotateVRM0(vrmInstance)
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
             const val = Math.max(0, Math.sin(t * 20) * 0.5)
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
      const mouseX = -state.pointer.x // Invert for mirror effect or natural look? Usually following cursor means if cursor is right (positive), look right (negative rotation Y)
      const mouseY = state.pointer.y // Up is positive

      // Helper to rotate bone towards cursor
      // Y rotation is horizontal (looking left/right) -> corresponds to mouse X
      // X rotation is vertical (looking up/down) -> corresponds to mouse Y
      const track = (boneName: string, multiplier: number) => {
        const bone = vrm.humanoid.getNormalizedBoneNode(boneName)
        if (bone) {
          // Smoothly interpolate
          bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, mouseX * multiplier, 0.1)
          bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, mouseY * multiplier, 0.1)
        }
      }

      // Eyes (0.5)
      track('leftEye', 0.5)
      track('rightEye', 0.5)

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
        <Html position={[0, 1.15, 0.1]} zIndexRange={[100, 0]} transform>
            <button
                onClick={() => speak("System online. Vylera neural core active.")}
                className="px-4 py-2 bg-emerald-500 text-black border border-emerald-500 rounded font-mono text-xs hover:bg-emerald-400 transition-all pointer-events-auto cursor-pointer opacity-90"
            >
                TEST VOICE
            </button>
        </Html>
    </group>
  )
}

export default function AvatarCanvas() {
  return (
    <Canvas
      camera={{ fov: 30 }}
      gl={{ alpha: true }}
    >
        <CameraRig />

        {/* Studio Lighting */}
        {/* Rim Light (Cool Blue/Cyan) - Back Left */}
        <spotLight
          position={[-2, 2, -2]}
          intensity={5}
          color="#00ffff"
          angle={0.5}
          penumbra={1}
        />

        {/* Key Light (Warm/Neutral) - Front Right */}
        <spotLight
          position={[2, 2, 2]}
          intensity={3}
          color="#ffffff"
          angle={0.5}
          penumbra={0.5}
        />

        {/* Fill Light - Front */}
        <ambientLight intensity={0.2} />

        <Suspense fallback={<Loader />}>
            <Avatar />
        </Suspense>

        {/* OrbitControls REMOVED */}
    </Canvas>
  )
}
