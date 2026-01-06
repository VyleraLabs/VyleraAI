'use client'

import React, { Suspense } from 'react'
import AvatarCanvas from '@/components/Meti/AvatarCanvas'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'

export default function InterfacePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      {/* Holographic Card */}
      <div className="w-full max-w-4xl h-[85vh] bg-black/80 backdrop-blur-md border border-emerald-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] flex flex-col relative">

        {/* Back Button (Absolute) */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 right-4 z-50 px-3 py-1 text-xs font-mono border border-emerald-500/50 text-emerald-500/80 hover:bg-emerald-500/20 rounded transition-colors"
        >
          EXIT_SESSION
        </button>

        {/* Viewport: Top 75% */}
        <div className="relative w-full h-[75%] border-b border-emerald-500/30">
           {/* Overlay: REC Dot + LIVE FEED */}
           <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
             <span className="font-mono text-xs text-red-500 font-bold tracking-wider">LIVE FEED</span>
           </div>

           {/* Subtle Glow Overlay */}
           <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(16,185,129,0.1)] z-10" />

           <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-emerald-500 font-mono">INITIALIZING...</div>}>
              <AvatarCanvas />
           </Suspense>
        </div>

        {/* Comms: Bottom 25% */}
        <div className="flex flex-col h-[25%] bg-black/40">
           {/* Log: Chat History */}
           <div className="flex-1 p-4 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-emerald-900 scrollbar-track-transparent">
              <div className="font-mono text-sm text-emerald-400 opacity-80">
                <span className="mr-2">[SYSTEM]</span>
                Meti: Neural Link Established. Awaiting Input.
              </div>
              {/* Future chat messages would go here */}
           </div>

           {/* Input Area */}
           <div className="p-4 border-t border-white/5 bg-black/60">
              <div className="flex items-center gap-2">
                 <div className="text-emerald-500/50 font-mono text-lg">{'>'}</div>
                 <input
                    type="text"
                    placeholder="[TYPE COMMAND...]"
                    className="flex-1 bg-transparent border-none outline-none font-mono text-emerald-100 placeholder-emerald-800/50 focus:ring-0"
                 />
                 <button className="p-2 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-colors">
                    <Send size={20} />
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  )
}
