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
                  placeholder="Type a message to Meti..."
                  className="bg-transparent border-none outline-none text-white px-4 py-2 flex-grow placeholder-white/50"
                />
                <button className="bg-[#00D26A] text-black rounded-full p-2 hover:bg-[#00b058] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
             </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
