'use client'

import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { useState, Suspense, forwardRef } from 'react'
import MetiAvatar, { AvatarHandle } from './MetiAvatar'

export type { AvatarHandle } from './MetiAvatar'

export interface AvatarProps {
  isThinking?: boolean;
  onCrash?: () => void;
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

  return (
    <Canvas
      key={key}
      gl={{
        preserveDrawingBuffer: true,
        alpha: true
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault();
          console.warn('Meti: Context Lost - Attempting Restore');
          handleCrash();
        });
      }}
    >
        <PerspectiveCamera makeDefault position={[0, 1.45, 3.2]} fov={35} />

        <hemisphereLight intensity={2.5} groundColor="#202020" color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

        <Suspense fallback={null}>
            <MetiAvatar ref={ref} onCrash={handleCrash} />
        </Suspense>
    </Canvas>
  )
})

AvatarCanvas.displayName = 'AvatarCanvas'

export default AvatarCanvas
