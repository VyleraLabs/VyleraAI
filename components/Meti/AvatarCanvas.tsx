'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useProgress, Html, Environment } from '@react-three/drei'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useEffect, useState, Suspense } from 'react'
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

function Avatar() {
  const [vrm, setVrm] = useState<any>(null)
  const gltf = useGLTF('/models/meti.vrm', undefined, undefined, (loader) => {
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser as any) as any
    })
  })

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

      // 1. T-Pose Fix (Arms)
      const leftArm = vrm.humanoid.getNormalizedBoneNode('leftUpperArm')
      const rightArm = vrm.humanoid.getNormalizedBoneNode('rightUpperArm')

      if (leftArm) leftArm.rotation.z = -1.2 // ~70 degrees down
      if (rightArm) rightArm.rotation.z = 1.2

      // 2. Breathing
      const spine = vrm.humanoid.getNormalizedBoneNode('spine')
      const neck = vrm.humanoid.getNormalizedBoneNode('neck')

      const breath = Math.sin(t * 1.5) * 0.03
      if (spine) spine.rotation.x = breath
      if (neck) neck.rotation.x = -breath * 0.5

      // 3. Blinking (Random interval)
      if (vrm.expressionManager) {
        // Simple periodic blink for robustness
        const blinkFrequency = 4.0
        const blinkDuration = 0.15
        const timeInCycle = t % blinkFrequency
        const isBlinking = timeInCycle < blinkDuration
        vrm.expressionManager.setValue('blink', isBlinking ? 1 : 0)
      }

      // 4. Head Tracking
      const head = vrm.humanoid.getNormalizedBoneNode('head')
      if (head) {
        // state.pointer values are normalized [-1, 1]
        // Clamp rotation to ~30 degrees (approx 0.5 radians)
        const targetLookX = -state.pointer.x * 0.5
        const targetLookY = -state.pointer.y * 0.5

        // Smooth interpolation
        head.rotation.y = THREE.MathUtils.lerp(head.rotation.y, targetLookX, 0.1)
        head.rotation.x = THREE.MathUtils.lerp(head.rotation.x, targetLookY, 0.1)
      }
    }
  })

  return <primitive object={gltf.scene} position={[0, -1, 0]} />
}

export default function AvatarCanvas() {
  return (
    <Canvas camera={{ position: [0, 0.8, 4], fov: 30 }} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        <Suspense fallback={<Loader />}>
            <Environment preset="city" />
            <Avatar />
        </Suspense>

        <OrbitControls target={[0, 0.8, 0]} enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
