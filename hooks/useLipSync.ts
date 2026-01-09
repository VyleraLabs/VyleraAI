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
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
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

        if (isSpeakingRef.current && analyserRef.current && dataArrayRef.current) {
            try {
                // Cast to any to resolve TS mismatch
                analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
                const data = dataArrayRef.current;

                // Frequency Mapping (Based on ~43Hz per bin at 44.1kHz/1024FFT)

                // Low (OU/OH): ~0 - 400Hz (Bins 0-9) -> Vowel 'O' / 'U'
                let lowSum = 0;
                for (let i = 0; i < 10; i++) lowSum += data[i];
                const lowAvg = lowSum / 10;

                // Mid (AA/AH): ~400 - 2000Hz (Bins 10-46) -> Vowel 'A'
                let midSum = 0;
                for (let i = 10; i < 47; i++) midSum += data[i];
                const midAvg = midSum / 37;

                // High (IH/EE): ~2000Hz+ (Bins 47+) -> Vowel 'I'
                let highSum = 0;
                for (let i = 47; i < 128; i++) highSum += data[i];
                const highAvg = highSum / 81;

                // Sensitivity Adjustment
                const sensitivity = 2.0;
                target_ou = Math.min(1, (lowAvg / 255) * sensitivity);
                target_aa = Math.min(1, (midAvg / 255) * sensitivity);
                target_ih = Math.min(1, (highAvg / 255) * sensitivity);

            } catch (e) {
                console.warn("Lip sync analysis error", e);
            }
        }

        // Apply Lerp (Smoothing)
        // 15.0 is a good speed for responsiveness without jitter
        const lerpFactor = 15.0 * deltaTime;
        const clampLerp = Math.min(lerpFactor, 1.0);

        currentVisemes.current.aa = THREE.MathUtils.lerp(currentVisemes.current.aa, target_aa, clampLerp);
        currentVisemes.current.ih = THREE.MathUtils.lerp(currentVisemes.current.ih, target_ih, clampLerp);
        currentVisemes.current.ou = THREE.MathUtils.lerp(currentVisemes.current.ou, target_ou, clampLerp);

        // Map to VRM Presets (Standard VRM 0.0/1.0)
        // aa -> aa (A)
        // ih -> ih (I)
        // ou -> ou (U/O)
        vrm.expressionManager.setValue('aa', currentVisemes.current.aa);
        vrm.expressionManager.setValue('ih', currentVisemes.current.ih);
        vrm.expressionManager.setValue('ou', currentVisemes.current.ou);


        // --- Blinking Logic ---
        // Using performance.now() for independent timing
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
