'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { useVoiceSession } from '@/hooks/useVoiceSession';
import { AvatarHandle } from './Meti/AvatarCanvas';

interface Message {
    role: 'ai' | 'user';
    text: string;
}

// Helper to sanitize text for TTS (client-side safety)
function cleanTextForSpeech(text: string): string {
    return text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
        .replace(/\*/g, '') // Single asterisk
        .replace(/##/g, '')
        .replace(/\((.*?)\)/g, '')
        .trim();
}

interface ChatInterfaceProps {
    avatarRef?: React.RefObject<AvatarHandle | null>;
}

export default function ChatInterface({ avatarRef }: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
      { role: 'ai', text: 'Neural Link Active. Awaiting input.' }
  ]);
  const [ttsFailureCount, setTtsFailureCount] = useState(0);
  const [isVoiceOffline, setIsVoiceOffline] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const { language, processFirstPrompt, isLocked } = useVoiceSession();

  // Queue for sentences waiting to be converted to speech
  const processingChain = useRef<Promise<void>>(Promise.resolve());
  // Abort Controller for pending TTS requests
  const ttsAbortController = useRef<AbortController | null>(null);

  // --- AUDIO QUEUE LOGIC ---
  const [audioQueue, setAudioQueue] = useState<Blob[]>([]);
  const isPlayingRef = useRef(false);

  const addToQueue = (blob: Blob) => {
      setAudioQueue(prev => [...prev, blob]);
  };

  const clearQueue = () => {
      setAudioQueue([]);
      if (avatarRef?.current) {
          avatarRef.current.stop();
      }
  };

  // Process the audio queue
  useEffect(() => {
      const processQueue = async () => {
          if (isPlayingRef.current || audioQueue.length === 0 || !avatarRef?.current) return;

          isPlayingRef.current = true;
          const blob = audioQueue[0];

          try {
              // Play audio and wait for it to finish
              await avatarRef.current.playAudioBlob(blob);
          } catch (e) {
              console.error("Playback error:", e);
          } finally {
              // Remove played item (regardless of success/failure to prevent stuck queue)
              setAudioQueue(prev => prev.slice(1));
              isPlayingRef.current = false;
          }
      };

      processQueue();
  }, [audioQueue, avatarRef]);


  // Global Error Listener for Version Skew
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
        if (event.message.includes("Server Action") || event.message.includes("digest mismatch")) {
            console.error("Version Skew Detected. Reloading.");
            window.location.reload();
        }
    };
    window.addEventListener('error', handleGlobalError);
    return () => window.removeEventListener('error', handleGlobalError);
  }, []);

  useEffect(() => {
      if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  }, [messages]);

  const processTextForTTS = (text: string) => {
      // If voice is offline, skip processing
      if (isVoiceOffline) return;

      // Capture the current controller for this specific request chain
      const currentController = ttsAbortController.current;

      // Chain the TTS requests to ensure audio is added to queue in order
      processingChain.current = processingChain.current.then(async () => {
          // Double check inside the async chain in case state changed
          if (isVoiceOffline) return;
          // Check if the SPECIFIC controller for this task was aborted
          if (currentController?.signal.aborted) return;

          const cleanSentence = cleanTextForSpeech(text);
          if (!cleanSentence.trim()) return;

          try {
              // Immediate Dispatch to ElevenLabs API
              const signal = currentController?.signal;
              const ttsRes = await fetch('/api/tts', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ text: cleanSentence, lang: language }),
                  signal: signal
              });

              if (ttsRes.ok) {
                  // Buffer the stream into a blob for the audio queue
                  // This allows "Sentence 2" to be ready in the queue while "Sentence 1" plays
                  const blob = await ttsRes.blob();
                  addToQueue(blob);
                  // Reset failure count on success
                  setTtsFailureCount(0);
              } else {
                 if (signal?.aborted) return;
                 throw new Error(`TTS Error: ${ttsRes.status}`);
              }
          } catch (err: any) {
              if (err.name === 'AbortError') return;
              console.error("TTS fetch failed for chunk:", cleanSentence, err);
              setTtsFailureCount(prev => {
                  const newCount = prev + 1;
                  if (newCount >= 3) {
                      setIsVoiceOffline(true);
                  }
                  return newCount;
              });
          }
      });
  };

  const handleManualRetry = () => {
      setTtsFailureCount(0);
      setIsVoiceOffline(false);
  };

  const handleSendMessage = async () => {
      if (!input.trim()) return;

      // 1. Abort any pending TTS operations from previous turns
      if (ttsAbortController.current) {
          ttsAbortController.current.abort();
      }
      // 2. Clear existing audio queue to prevent overlap
      clearQueue();
      // 3. Create new controller for this turn
      ttsAbortController.current = new AbortController();

      // Process First Prompt for Voice Lock
      if (!isLocked) {
          processFirstPrompt(input);
      }

      // Add User Message
      const userMsg: Message = { role: 'user', text: input };
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      setIsThinking(true);

      // Create a placeholder for the AI message
      const aiMsg: Message = { role: 'ai', text: '' };
      setMessages(prev => [...prev, aiMsg]);

      try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                message: userMsg.text,
                history: messages,
                lang: language
            })
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            const errorMessage = errorData.error || errorData.text || 'Failed to get response';
            console.error('API Error:', errorMessage);
            throw new Error(errorMessage);
        }
        if (!res.body) throw new Error('No response body');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullText += chunk;

            // Update UI with current full text immediately
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1] = { role: 'ai', text: fullText };
                return newArr;
            });
        }

        // Process full text for TTS after stream completes (No slicing)
        if (fullText.trim()) {
             processTextForTTS(fullText);
        }

      } catch (error) {
        console.error(error);
        const errorMsg: Message = { role: 'ai', text: 'Neural uplink failed. Please retry.' };
        setMessages(prev => [...prev, errorMsg]);
      } finally {
        setIsThinking(false);
      }
  };

  return (
      <div className="w-full h-full flex flex-col relative">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div className="text-xs tracking-[0.2em] text-white/30 font-sans font-bold">
                  {isThinking ? 'STATUS: NEURAL PROCESSING...' : 'NEURAL LINK ACTIVE'}
              </div>
              {isVoiceOffline && (
                  <button
                    onClick={handleManualRetry}
                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors border border-red-500/30 px-3 py-1 rounded bg-red-500/10"
                  >
                      <RefreshCw size={12} />
                      VOICE SYSTEM OFFLINE (RETRY)
                  </button>
              )}
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

          {/* Input Area */}
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
  );
}
