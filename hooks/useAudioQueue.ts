import { useState, useRef, useEffect, useCallback } from 'react';

export function useAudioQueue() {
    const [queue, setQueue] = useState<Blob[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const currentUrlRef = useRef<string | null>(null);
    const isMountedRef = useRef(true);

    // Mount tracking
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio();

        audioRef.current.onended = () => {
            if (currentUrlRef.current) {
                URL.revokeObjectURL(currentUrlRef.current);
                currentUrlRef.current = null;
            }
            if (isMountedRef.current) {
                setIsPlaying(false);
                setQueue(prev => prev.slice(1)); // Remove played item
            }
        };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (currentUrlRef.current) {
                URL.revokeObjectURL(currentUrlRef.current);
                currentUrlRef.current = null;
            }
        };
    }, []);

    const addToQueue = useCallback((audioBlob: Blob) => {
        if (isMountedRef.current) {
            setQueue(prev => [...prev, audioBlob]);
        }
    }, []);

    const playNext = useCallback(async () => {
        if (!audioRef.current || queue.length === 0) return;

        // Cleanup previous URL if exists (though onended handles it, this is safety for interruptions)
        if (currentUrlRef.current) {
            URL.revokeObjectURL(currentUrlRef.current);
            currentUrlRef.current = null;
        }

        const blob = queue[0];
        const url = URL.createObjectURL(blob);
        currentUrlRef.current = url;
        audioRef.current.src = url;

        try {
            await audioRef.current.play();
            if (isMountedRef.current) {
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("Audio playback error:", error);
            // Cleanup on failure
            if (currentUrlRef.current) {
                URL.revokeObjectURL(currentUrlRef.current);
                currentUrlRef.current = null;
            }
            if (isMountedRef.current) {
                setIsPlaying(false);
                setQueue(prev => prev.slice(1)); // Skip problematic audio
            }
        }
    }, [queue]);

    // Watch queue and playing state
    useEffect(() => {
        if (queue.length > 0 && !isPlaying) {
            playNext();
        }
    }, [queue, isPlaying, playNext]);

    return {
        addToQueue,
        isPlaying,
        queueLength: queue.length
    };
}
