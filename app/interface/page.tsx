'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useProgress } from '@react-three/drei';
import AvatarCanvas from '@/components/Meti/AvatarCanvas';
import { motion, AnimatePresence } from 'framer-motion';

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="absolute inset-0 flex items-center justify-center text-green-500 font-mono text-xl z-50">
      INITIALIZING NEURAL CORE... [{Math.round(progress)}%]
    </div>
  );
}

export default function InterfacePage() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setChatResponse(null); // Clear previous response
    try {
      const res = await fetch('/api/meti/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText, uid: 'user-123' }), // TODO: Replace with actual UID
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      setChatResponse(data.text);

      if (data.audioContent) {
        const audio = new Audio('data:audio/mp3;base64,' + data.audioContent);
        audio.play().catch(e => console.error("Audio play failed", e));
      }

      setInputText('');

    } catch (error) {
      console.error('Error sending message:', error);
      setChatResponse('Error: Could not connect to Meti.');
    } finally {
      setLoading(false);
    }
  };

  // Custom loader logic handling
  const { progress } = useProgress();
  const isLoaded = progress === 100;

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      {/* Loading State */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black"
          >
             <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Scene - Only visible/rendered when practically loaded, but Canvas handles loading */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <AvatarCanvas />
      </div>

      {/* UI Overlay */}
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 pointer-events-none" // Allow clicks to pass through to Canvas if needed
        >
          {/* Top Right: Exit/Disconnect */}
          <div className="absolute top-6 right-6 pointer-events-auto">
            <Link
              href="/"
              className="text-white/70 hover:text-white border border-white/30 rounded px-4 py-2 text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Disconnect
            </Link>
          </div>

          {/* Bottom Center: Glassmorphism Input Bar */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg pointer-events-auto px-4">
             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 flex items-center shadow-[0_0_15px_rgba(0,210,106,0.2)]">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
                  placeholder={loading ? "Meti is thinking..." : "Type a message to Meti..."}
                  disabled={loading}
                  className="bg-transparent border-none outline-none text-white px-4 py-2 flex-grow placeholder-white/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading}
                  className={`bg-[#00D26A] text-black rounded-full p-2 hover:bg-[#00b058] transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  )}
                </button>
             </div>
          </div>

          {/* Chat Response Bubble */}
          <AnimatePresence>
            {chatResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-28 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 pointer-events-none"
              >
                <div className="bg-black/60 backdrop-blur-md border border-[#00D26A]/30 rounded-2xl p-4 text-white/90 shadow-[0_0_20px_rgba(0,210,106,0.1)]">
                  <p className="text-sm font-light leading-relaxed">{chatResponse}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
