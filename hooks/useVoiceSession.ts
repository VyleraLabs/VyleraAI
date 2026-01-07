import { useState, useCallback } from 'react';

type Language = 'en' | 'id';

interface UseVoiceSessionReturn {
  language: Language;
  processFirstPrompt: (text: string) => void;
  isLocked: boolean;
}

const INDONESIAN_KEYWORDS = [
  'aku', 'saya', 'kamu', 'anda', 'ini', 'itu', 'yang', 'dan', 'di', 'ke', 'dari',
  'apa', 'siapa', 'kapan', 'dimana', 'mengapa', 'bagaimana', 'bisa', 'mau', 'tidak', 'ya',
  'halo', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'terima', 'kasih'
];

export function useVoiceSession(): UseVoiceSessionReturn {
  const [language, setLanguage] = useState<Language>('en'); // Default to English
  const [isLocked, setIsLocked] = useState(false);

  // Logic:
  // 1. Detect language of first prompt.
  // 2. Lock session to that language.
  // 3. API (lib/elevenLabs.ts) handles mapping 'en'/'id' to VOICE_ID_EN/VOICE_ID_ID from env vars.
  const processFirstPrompt = useCallback((text: string) => {
    if (isLocked) return;

    const lowerText = text.toLowerCase();
    // Simple heuristic: check if any Indonesian keyword is present as a whole word
    const words = lowerText.split(/\s+/);
    const idCount = words.filter(word => INDONESIAN_KEYWORDS.includes(word.replace(/[^\w]/g, ''))).length;

    if (idCount > 0) {
       setLanguage('id');
    } else {
       setLanguage('en');
    }

    setIsLocked(true);
  }, [isLocked]);

  return {
    language,
    processFirstPrompt,
    isLocked
  };
}
