'use client'

import React, { Suspense, useRef, useState, useEffect } from 'react'
import AvatarCanvas, { AvatarHandle } from '@/components/Meti/AvatarCanvas'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'

interface Message {
    role: 'ai' | 'user';
    text: string;
}

export default function InterfacePage() {
  const router = useRouter()
  const avatarRef = useRef<AvatarHandle>(null)
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
      { role: 'ai', text: 'Neural Link Active. Awaiting input.' }
  ])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
  }, [messages])

  const handleSendMessage = async () => {
      if (!input.trim()) return

      // Add User Message
      const userMsg: Message = { role: 'user', text: input }
      setMessages(prev => [...prev, userMsg])
      setInput('')
      setIsThinking(true)

      try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                message: userMsg.text,
                history: messages
            })
        })

        if (!res.ok) throw new Error('Failed to get response')

        const data = await res.json()
        const aiText = data.text

        const aiMsg: Message = { role: 'ai', text: aiText }
        setMessages(prev => [...prev, aiMsg])

        // TRIGGER VOICE
        if (avatarRef.current) {
            avatarRef.current.speak(aiText)
        }
      } catch (error) {
        console.error(error)
        const errorMsg: Message = { role: 'ai', text: 'Neural uplink failed. Please retry.' }
        setMessages(prev => [...prev, errorMsg])
      } finally {
        setIsThinking(false)
      }
  }

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

          {/* Header */}
          <div className="p-6 border-b border-white/5">
              <div className="text-xs tracking-[0.2em] text-white/30 font-sans font-bold">
                  {isThinking ? 'STATUS: NEURAL PROCESSING...' : 'NEURAL LINK ACTIVE'}
              </div>
          </div>

          {/* Log Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
          >
              {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'ai' ? (
                          <div className="text-gray-200 text-lg leading-relaxed font-sans max-w-[90%]">
                              {msg.text}
                          </div>
                      ) : (
                          <div className="bg-white/10 text-white px-5 py-3 rounded-2xl max-w-[80%] backdrop-blur-md font-sans text-base">
                              {msg.text}
                          </div>
                      )}
                  </div>
              ))}
          </div>

          {/* Input Area - Floating at bottom of the panel */}
          <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="relative">
                  <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all font-sans pr-12"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors"
                  >
                      <Send size={20} />
                  </button>
              </div>
          </div>

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
