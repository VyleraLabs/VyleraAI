'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { useProgress, Html } from '@react-three/drei'
import { useEffect, useState, Suspense, forwardRef } from 'react'
import * as THREE from 'three'
import MetiAvatar, { AvatarHandle } from './MetiAvatar'
import DebugAvatar from './DebugAvatar'

export type { AvatarHandle } from './MetiAvatar'

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
            <DebugAvatar ref={ref} />
            {/* <MetiAvatar ref={ref} onCrash={handleCrash} /> */}
        </Suspense>
    </Canvas>
  )
})

AvatarCanvas.displayName = 'AvatarCanvas'

export default AvatarCanvas
