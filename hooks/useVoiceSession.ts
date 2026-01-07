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

  const processFirstPrompt = useCallback((text: string) => {
    if (isLocked) return;

    const lowerText = text.toLowerCase();
    // Simple heuristic: check if any Indonesian keyword is present as a whole word
    // This is a basic detection and can be improved with a proper library if needed.
    const words = lowerText.split(/\s+/);
    const idCount = words.filter(word => INDONESIAN_KEYWORDS.includes(word.replace(/[^\w]/g, ''))).length;

    // If we find a significant number of ID keywords relative to length, or just any for short texts?
    // Let's say if we find at least 1 strong indicator or the ratio is high.
    // Given the task says "Indonesian Detected", let's be a bit generous but safe.
    // If the user says "Halo", it should detect ID.
    if (idCount > 0) {
       // A slightly more robust check might be needed for mixed sentences,
       // but for "First-Prompt" usually it's "Hello" vs "Halo" or "Help me" vs "Bantu saya".
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
