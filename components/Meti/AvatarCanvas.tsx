'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, useProgress, Html, Environment } from '@react-three/drei'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useEffect, useState, Suspense } from 'react'

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

  useFrame((state) => {
    if (vrm) {
      vrm.update(state.clock.getDelta())

      const chest = vrm.humanoid.getNormalizedBoneNode('chest')
      if (chest) {
         const t = state.clock.elapsedTime
         const breath = Math.sin(t * 1.5) * 0.05
         chest.rotation.x = breath
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

        <OrbitControls target={[0, 0.8, 0]} />
    </Canvas>
  )
}
