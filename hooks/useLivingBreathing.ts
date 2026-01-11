import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

export function useLivingBreathing(scene: THREE.Group, isActive: boolean) {
  // Use refs for random blinking logic to avoid allocations in useFrame
  const blinkState = useRef({
    isBlinking: false,
    startTime: 0,
    duration: 0.15, // Duration of the blink in seconds
    nextBlinkTime: 0
  });

  // Cached bone references
  const bonesRef = useRef<{
    spine: THREE.Object3D | null;
    head: THREE.Object3D | null;
    face: THREE.Mesh | null;
  } | null>(null);

  useFrame((state) => {
    if (!isActive || !scene) return;

    // Initialize bones reference once
    if (!bonesRef.current) {
      bonesRef.current = {
        spine: scene.getObjectByName('J_Bip_C_Spine') || null,
        head: scene.getObjectByName('J_Bip_C_Head') || null,
        face: (scene.getObjectByName('Face') || scene.getObjectByName('Body') || scene.getObjectByName('mesh_0')) as THREE.Mesh || null,
      };
    }

    const { spine, head, face } = bonesRef.current;
    const t = state.clock.elapsedTime;

    // 1. Breathing (Sine wave on Spine X-axis)
    // Logic: Math.sin(t) * 0.03
    if (spine) {
      spine.rotation.x = Math.sin(t) * 0.03;
    }

    // 2. Head Drift
    // Logic: Math.sin(t * 0.5) * 0.02
    if (head) {
        head.rotation.y = Math.sin(t * 0.5) * 0.02;
    }

    // 3. Blinking
    if (face && face.morphTargetInfluences && face.morphTargetDictionary) {
        const blinkIndex = face.morphTargetDictionary['blink'] ?? face.morphTargetDictionary['Blink'];
        if (blinkIndex !== undefined) {
            const bs = blinkState.current;

            if (bs.nextBlinkTime === 0) {
                bs.nextBlinkTime = t + 2 + Math.random() * 4;
            }

            if (!bs.isBlinking && t > bs.nextBlinkTime) {
                bs.isBlinking = true;
                bs.startTime = t;
                bs.nextBlinkTime = t + 2 + Math.random() * 4;
            }

            if (bs.isBlinking) {
                const elapsed = t - bs.startTime;
                if (elapsed >= bs.duration) {
                    bs.isBlinking = false;
                    face.morphTargetInfluences[blinkIndex] = 0;
                } else {
                    const progress = elapsed / bs.duration;
                    const value = Math.sin(progress * Math.PI);
                    face.morphTargetInfluences[blinkIndex] = value;
                }
            }
        }
    }
  });
}
