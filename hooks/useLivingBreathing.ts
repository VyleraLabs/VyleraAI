import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

export function useLivingBreathing(nodes: any, isActive: boolean) {
  // Use refs for random blinking logic to avoid allocations in useFrame
  const blinkState = useRef({
    isBlinking: false,
    startTime: 0,
    duration: 0.15, // Duration of the blink in seconds
    nextBlinkTime: 0
  });

  // Cached bone references to avoid lookups in useFrame (lazily initialized)
  const bonesRef = useRef<{
    spine: THREE.Object3D | null;
    head: THREE.Object3D | null;
    leftArm: THREE.Object3D | null;
    rightArm: THREE.Object3D | null;
    face: THREE.Mesh | null; // For morph targets
  } | null>(null);

  useFrame((state) => {
    if (!isActive || !nodes) return;

    // Initialize bones reference once
    if (!bonesRef.current) {
      bonesRef.current = {
        spine: nodes.J_Bip_C_Spine || null,
        head: nodes.J_Bip_C_Head || null,
        leftArm: nodes.J_Bip_C_UpperArm_L || null,
        rightArm: nodes.J_Bip_C_UpperArm_R || null,
        face: nodes.Face || nodes.Body || null,
      };
    }

    const { spine, leftArm, rightArm, face } = bonesRef.current;
    const time = state.clock.elapsedTime;

    // 1. Polite Pose (Arms clasped in front)
    // Lerp arms to a specific rotation.
    // Assuming T-pose or similar initial state.
    // Approximate rotations for clasped hands:
    // UpperArm L: Z ~ -80deg (-1.4 rad), X ~ 20deg (0.35 rad)
    // UpperArm R: Z ~ 80deg (1.4 rad), X ~ 20deg (0.35 rad)

    // Smooth interpolation factor
    const lerpFactor = 0.1;

    if (leftArm) {
      // Rotate down (Z) and slightly forward (X)
      leftArm.rotation.z = THREE.MathUtils.lerp(leftArm.rotation.z, -1.3, lerpFactor);
      leftArm.rotation.x = THREE.MathUtils.lerp(leftArm.rotation.x, 0.3, lerpFactor);
    }

    if (rightArm) {
      // Mirror for right arm
      rightArm.rotation.z = THREE.MathUtils.lerp(rightArm.rotation.z, 1.3, lerpFactor);
      rightArm.rotation.x = THREE.MathUtils.lerp(rightArm.rotation.x, 0.3, lerpFactor);
    }

    // 2. Breathing (Sine wave on Spine X-axis)
    if (spine) {
      // "Subtle Sine wave on Spine X-axis".
      spine.rotation.x = Math.sin(time * 2.0) * 0.05; // 0.05 rad is subtle.
    }

    // 3. Blinking
    if (face && face.morphTargetInfluences && face.morphTargetDictionary) {
        const blinkIndex = face.morphTargetDictionary['blink'];
        if (blinkIndex !== undefined) {
            const t = state.clock.elapsedTime;
            const bs = blinkState.current;

            // Init next blink time
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
                    // Sine for smooth blink
                    const progress = elapsed / bs.duration;
                    const value = Math.sin(progress * Math.PI);
                    face.morphTargetInfluences[blinkIndex] = value;
                }
            }
        }
    }
  });
}
