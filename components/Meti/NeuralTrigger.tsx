'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function NeuralTrigger() {
  const router = useRouter();

  const handleClick = () => {
    // Navigate to interface
    router.push('/interface');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.1, 1],
        boxShadow: [
          "0 0 10px rgba(0, 210, 106, 0.5)",
          "0 0 25px rgba(0, 210, 106, 0.8)",
          "0 0 10px rgba(0, 210, 106, 0.5)"
        ]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="fixed bottom-6 right-6 w-[60px] h-[60px] rounded-full bg-black border-2 border-[#00D26A] flex items-center justify-center cursor-pointer z-50 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-[#00D26A] opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
      <div className="w-3 h-3 bg-[#00D26A] rounded-full shadow-[0_0_10px_#00D26A]"></div>
    </motion.button>
  );
}
