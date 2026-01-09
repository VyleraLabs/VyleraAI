import { useRef, useCallback, useEffect } from 'react';
import * as THREE from 'three';

export function useLipSync() {
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const isSpeakingRef = useRef(false);

    // Smoothing state
    const currentVisemes = useRef({
        aa: 0, // "aa" sound (open mouth)
        ih: 0, // "ih/ee" sound (wide mouth)
        ou: 0  // "ou/oh" sound (rounded mouth)
    });

    // Blink state
    const blinkRef = useRef({
        nextBlinkTime: 0,
        isBlinking: false,
        blinkStartTime: 0,
        duration: 0.15
    });

    const stop = useCallback(() => {
        if (sourceRef.current) {
            try {
                sourceRef.current.stop();
                sourceRef.current.disconnect();
            } catch (e) {
                // Ignore errors if already stopped
            }
            sourceRef.current = null;
        }
        isSpeakingRef.current = false;

        // Reset smoothing targets immediately on stop
        currentVisemes.current = { aa: 0, ih: 0, ou: 0 };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stop();
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, [stop]);

    const playAudioBlob = useCallback(async (blob: Blob) => {
        stop(); // Stop any currently playing audio

        try {
            const arrayBuffer = await blob.arrayBuffer();

            if (!audioContextRef.current) {
                // Use standard AudioContext
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                audioContextRef.current = new AudioContextClass();
            }
            const ctx = audioContextRef.current;

            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;

            const analyser = ctx.createAnalyser();
            analyser.fftSize = 1024; // High resolution for better frequency separation
            analyser.smoothingTimeConstant = 0.5; // Additional smoothing at node level
            analyserRef.current = analyser;

            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

            source.connect(analyser);
            analyser.connect(ctx.destination); // Connect to speakers

            source.onended = () => {
                isSpeakingRef.current = false;
                source.disconnect();
                if (sourceRef.current === source) {
                    sourceRef.current = null;
                }
            };

            sourceRef.current = source;
            isSpeakingRef.current = true;
            source.start(0);

        } catch (e) {
            console.error("Audio decode/play failed", e);
            isSpeakingRef.current = false;
        }
    }, [stop]);

    const updateLipSync = useCallback((vrm: any, deltaTime: number) => {
        if (!vrm || !vrm.expressionManager) return;

        // --- Lip Sync Logic ---
        let target_aa = 0;
        let target_ih = 0;
        let target_ou = 0;

        const SENSITIVITY = 1.5;
        const THRESHOLD = 0.1;

        if (isSpeakingRef.current && analyserRef.current && dataArrayRef.current) {
            try {
                // Get frequency data (0-255)
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                const data = dataArrayRef.current;

                // Frequency Mapping (Based on ~43Hz per bin at 44.1kHz/1024FFT)

                // Low Band (Bass) -> OU (0-10, ~0-430Hz) -> Vowel 'O' / 'U'
                let lowSum = 0;
                const lowCount = 10;
                for (let i = 0; i < lowCount; i++) lowSum += data[i];
                const lowAvg = lowSum / lowCount;

                // Mid Band (Mids) -> AA (10-46, ~430-2000Hz) -> Vowel 'A'
                let midSum = 0;
                const midCount = 37;
                for (let i = 10; i < 10 + midCount; i++) midSum += data[i];
                const midAvg = midSum / midCount;

                // High Band (Treble) -> IH (47-128, ~2000-5500Hz) -> Vowel 'I' / 'E' / 'S'
                let highSum = 0;
                const highCount = 81;
                for (let i = 47; i < 47 + highCount; i++) highSum += data[i];
                const highAvg = highSum / highCount;

                // Calculate normalized values (0-1) with Sensitivity
                let val_ou = (lowAvg / 255) * SENSITIVITY;
                let val_aa = (midAvg / 255) * SENSITIVITY;
                let val_ih = (highAvg / 255) * SENSITIVITY;

                // Apply Noise Gate Threshold
                if (val_ou < THRESHOLD) val_ou = 0;
                if (val_aa < THRESHOLD) val_aa = 0;
                if (val_ih < THRESHOLD) val_ih = 0;

                target_ou = Math.min(1, val_ou);
                target_aa = Math.min(1, val_aa);
                target_ih = Math.min(1, val_ih);

            } catch (e) {
                console.warn("Lip sync analysis error", e);
            }
        }

        // Apply Lerp (Smoothing)
        const lerpFactor = 0.1; // Smooth transition (approx 0.1)

        currentVisemes.current.aa = THREE.MathUtils.lerp(currentVisemes.current.aa, target_aa, lerpFactor);
        currentVisemes.current.ih = THREE.MathUtils.lerp(currentVisemes.current.ih, target_ih, lerpFactor);
        currentVisemes.current.ou = THREE.MathUtils.lerp(currentVisemes.current.ou, target_ou, lerpFactor);

        // Map to VRM Presets
        vrm.expressionManager.setValue('aa', currentVisemes.current.aa);
        vrm.expressionManager.setValue('ih', currentVisemes.current.ih);
        vrm.expressionManager.setValue('ou', currentVisemes.current.ou);


        // --- Blinking Logic ---
        const t = performance.now() / 1000;
        const blink = blinkRef.current;

        // Initialize next blink time if needed
        if (blink.nextBlinkTime === 0) {
            blink.nextBlinkTime = t + 2 + Math.random() * 3;
        }

        // Trigger Blink
        if (!blink.isBlinking && t > blink.nextBlinkTime) {
            blink.isBlinking = true;
            blink.blinkStartTime = t;
            // Next blink in 2-5 seconds
            blink.nextBlinkTime = t + 2 + Math.random() * 3;
        }

        // Animate Blink
        if (blink.isBlinking) {
            const progress = (t - blink.blinkStartTime) / blink.duration;

            if (progress >= 1) {
                blink.isBlinking = false;
                vrm.expressionManager.setValue('blink', 0);
            } else {
                // Sine wave for smooth open/close
                const blinkValue = Math.sin(progress * Math.PI);
                vrm.expressionManager.setValue('blink', blinkValue);
            }
        }

    }, []);

    return {
        playAudioBlob,
        stop,
        updateLipSync,
        isSpeaking: isSpeakingRef.current
    };
}
