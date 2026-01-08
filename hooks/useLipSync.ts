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
        oo: 0,
        aa: 0,
        ee: 0
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
        currentVisemes.current = { oo: 0, aa: 0, ee: 0 };
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
            analyser.fftSize = 512; // Moderate resolution
            analyserRef.current = analyser;

            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

            source.connect(analyser);
            analyser.connect(ctx.destination);

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

        let target_oo = 0;
        let target_aa = 0;
        let target_ee = 0;

        if (isSpeakingRef.current && analyserRef.current && dataArrayRef.current) {
            try {
                // Cast to any to resolve TS mismatch between Uint8Array<ArrayBufferLike> and Uint8Array<ArrayBuffer>
                analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

                // Low: Bins 0-4 (~0-350Hz)
                let lowSum = 0;
                for (let i = 0; i < 4; i++) lowSum += dataArrayRef.current[i];
                const lowAvg = lowSum / 4;

                // Mid: Bins 4-20 (~350-1700Hz)
                let midSum = 0;
                for (let i = 4; i < 20; i++) midSum += dataArrayRef.current[i];
                const midAvg = midSum / 16;

                // High: Bins 20-100 (~1700-8600Hz)
                let highSum = 0;
                for (let i = 20; i < 100; i++) highSum += dataArrayRef.current[i];
                const highAvg = highSum / 80;

                const sensitivity = 2.5;
                target_oo = Math.min(1, (lowAvg / 255) * sensitivity);
                target_aa = Math.min(1, (midAvg / 255) * sensitivity);
                target_ee = Math.min(1, (highAvg / 255) * sensitivity);

            } catch (e) {
                console.warn("Lip sync analysis error", e);
            }
        }

        // Apply Lerp (Smoothing)
        // Lerp factor: 0.1 is standard smooth, adjust for responsiveness
        const lerpFactor = 15.0 * deltaTime; // Time-based lerp for frame-rate independence
        const clampLerp = Math.min(lerpFactor, 1.0);

        currentVisemes.current.oo = THREE.MathUtils.lerp(currentVisemes.current.oo, target_oo, clampLerp);
        currentVisemes.current.aa = THREE.MathUtils.lerp(currentVisemes.current.aa, target_aa, clampLerp);
        currentVisemes.current.ee = THREE.MathUtils.lerp(currentVisemes.current.ee, target_ee, clampLerp);

        vrm.expressionManager.setValue('Fcl_MTH_O', currentVisemes.current.oo);
        vrm.expressionManager.setValue('Fcl_MTH_A', currentVisemes.current.aa);
        vrm.expressionManager.setValue('Fcl_MTH_I', currentVisemes.current.ee);

    }, []);

    return {
        playAudioBlob,
        stop,
        updateLipSync,
        isSpeaking: isSpeakingRef.current
    };
}
