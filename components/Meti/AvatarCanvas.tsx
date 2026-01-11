'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { useProgress, Html, PerspectiveCamera } from '@react-three/drei'
import { useEffect, useState, Suspense, forwardRef } from 'react'
import * as THREE from 'three'
import MetiAvatar, { AvatarHandle } from './MetiAvatar'

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

const AvatarCanvas = forwardRef<AvatarHandle, AvatarProps>((props, ref) => {
  const [key, setKey] = useState(0);
  const [hasCrashed, setHasCrashed] = useState(false);

  const handleCrash = () => {
      if (hasCrashed) return;
      setHasCrashed(true);

      console.log("WebGL Context Lost. Attempting to reboot Neural Core in 2 seconds...");

      setTimeout(() => {
          setHasCrashed(false);
          setKey(prev => prev + 1);
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

  // Task: Re-implement the Scene setup.
  // Return a <Canvas> with gl={{ preserveDrawingBuffer: true }}.
  // Lighting: <ambientLight intensity={2} /> and <directionalLight position={[2, 5, 2]} intensity={1.5} />.
  // Camera: <PerspectiveCamera makeDefault position={[0, 1.4, 3]} fov={40} />.
  // Content: <Suspense fallback={null}><MetiAvatar /></Suspense>.

  return (
    <Canvas
      key={key}
      gl={{
        preserveDrawingBuffer: true,
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          console.warn('Meti: Context Lost - Attempting Restore');
          handleCrash();
        });
      }}
    >
        <PerspectiveCamera makeDefault position={[0, 1.4, 3]} fov={40} />

        <ambientLight intensity={2} />
        <directionalLight position={[2, 5, 2]} intensity={1.5} />

        <Suspense fallback={<Loader />}>
            <MetiAvatar ref={ref} onCrash={handleCrash} />
        </Suspense>
    </Canvas>
  )
})

AvatarCanvas.displayName = 'AvatarCanvas'

export default AvatarCanvas
