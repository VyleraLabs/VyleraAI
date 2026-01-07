'use client'

import React, { Suspense, useRef } from 'react'
import AvatarCanvas, { AvatarHandle } from '@/components/Meti/AvatarCanvas'
import { useRouter } from 'next/navigation'
import ChatInterface from '@/components/ChatInterface'

export default function InterfacePage() {
  const router = useRouter()
  const avatarRef = useRef<AvatarHandle>(null)

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden relative pb-24">

      {/* Split View */}

      {/* Left Panel (Avatar) - 2/3 Width */}
      <div className="w-2/3 h-full relative flex items-center justify-center bg-gradient-to-b from-emerald-900/10 to-black">
          {/* Avatar Canvas floating freely */}
          <div className="w-full h-full absolute inset-0">
             <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-emerald-500 font-mono">INITIALIZING NEURAL CORE...</div>}>
                <AvatarCanvas ref={avatarRef} />
             </Suspense>
          </div>
      </div>

      {/* Right Panel (Chat) - 1/3 Width */}
      <div className="w-1/3 h-full border-l border-white/5 bg-white/5 backdrop-blur-2xl flex flex-col relative z-10">
          <ChatInterface />
      </div>

      {/* Exit Button (Optional overlay) */}
      <button
          onClick={() => router.push('/')}
          className="absolute top-6 right-6 z-50 text-white/20 hover:text-white transition-colors text-xs tracking-widest"
      >
          EXIT
      </button>

    </div>
  )
}
