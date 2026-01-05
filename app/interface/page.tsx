'use client'

import React, { Suspense } from 'react'
import AvatarCanvas from '@/components/Meti/AvatarCanvas'
import { useRouter } from 'next/navigation'
import { useProgress } from '@react-three/drei'

function Loader() {
  const { progress } = useProgress()
  return (
    <div className="absolute inset-0 flex items-center justify-center text-green-500 font-mono text-xl z-10">
      INITIALIZING NEURAL CORE... [{progress.toFixed(0)}%]
    </div>
  )
}

export default function InterfacePage() {
  const router = useRouter()

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Back to Home Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 right-4 z-20 px-4 py-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors font-mono"
      >
        Back to Home
      </button>

      {/* 3D Scene */}
      <Suspense fallback={<Loader />}>
        <AvatarCanvas />
      </Suspense>
    </div>
  )
}
