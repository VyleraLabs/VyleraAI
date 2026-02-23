import { useState, useCallback } from 'react';

export function useMetiBrain() {
  const [isThinking, setIsThinking] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    setIsThinking(true);
    // Placeholder for future AI connection (Vertex AI)
    console.log('Sending message to Meti:', text);

    // Simulate thinking delay
    setTimeout(() => {
      setIsThinking(false);
      // Placeholder for response
      console.log('Meti response received');
    }, 1000);
  }, []);

  return {
    sendMessage,
    isThinking,
    audioUrl
  };
}
