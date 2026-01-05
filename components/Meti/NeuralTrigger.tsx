'use client'

import { useRouter } from 'next/navigation'

export default function NeuralTrigger() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/interface')}
      className="fixed bottom-20 right-6 z-[60] w-14 h-14 bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] animate-pulse hover:scale-110 transition-transform flex items-center justify-center cursor-pointer"
      aria-label="Open Interface"
    >
      <div className="w-full h-full rounded-full bg-green-400 opacity-75 blur-sm" />
    </button>
  )
}
