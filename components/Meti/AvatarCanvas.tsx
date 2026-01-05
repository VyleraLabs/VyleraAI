'use client'

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm'
import { useEffect, useState } from 'react'

function Avatar() {
  const [vrm, setVrm] = useState<any>(null)

  // Custom loading logic to support VRM plugin
  const gltf = useLoader(GLTFLoader, '/models/meti.vrm', (loader) => {
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser)
    })
  })

  useEffect(() => {
    if (gltf && gltf.userData.vrm) {
      const vrmInstance = gltf.userData.vrm
      // Helper for VRM0 compatibility if needed, though most new ones are VRM1.
      // Safe to call rotateVRM0 if it is vrm0, it checks inside.
      VRMUtils.rotateVRM0(vrmInstance)
      setVrm(vrmInstance)
    }
  }, [gltf])

  useFrame((state) => {
    if (vrm) {
      vrm.update(state.clock.getDelta())

      // Idle breathing: manipulate chest bone rotation
      const chest = vrm.humanoid.getNormalizedBoneNode('chest')
      if (chest) {
         const t = state.clock.elapsedTime
         const breath = Math.sin(t * 1.5) * 0.05 // Adjust speed and amplitude
         chest.rotation.x = breath
      }
    }
  })

  return vrm ? <primitive object={vrm.scene} /> : null
}

export default function AvatarCanvas() {
  return (
    <Canvas camera={{ position: [0, 1.4, 0.8] }} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[1, 1, 1]} intensity={1} />
        <Avatar />
        <OrbitControls target={[0, 1.4, 0]} />
    </Canvas>
  )
}
