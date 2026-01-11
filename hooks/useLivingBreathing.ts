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
    leftUpperArm: THREE.Object3D | null;
    rightUpperArm: THREE.Object3D | null;
    leftLowerArm: THREE.Object3D | null;
    rightLowerArm: THREE.Object3D | null;
    face: THREE.Mesh | null; // For morph targets
  } | null>(null);

  useFrame((state) => {
    if (!isActive || !nodes) return;

    // Initialize bones reference once
    if (!bonesRef.current) {
      bonesRef.current = {
        spine: nodes.J_Bip_C_Spine || null,
        head: nodes.J_Bip_C_Head || null,
        leftUpperArm: nodes.J_Bip_C_UpperArm_L || null,
        rightUpperArm: nodes.J_Bip_C_UpperArm_R || null,
        leftLowerArm: nodes.J_Bip_C_LowerArm_L || null,
        rightLowerArm: nodes.J_Bip_C_LowerArm_R || null,
        face: nodes.Face || nodes.Body || null,
      };
    }

    const { spine, head, leftUpperArm, rightUpperArm, leftLowerArm, rightLowerArm, face } = bonesRef.current;
    const time = state.clock.elapsedTime;
    const lerpFactor = 0.1;

    // 1. Polite Pose (Arms clasped in front)
    // Target: UpperArm X ~20° (0.35), Z ~80° (1.4); LowerArm Z ~20° (0.35).
    // Note: VRM standard bones usually have Z axis pointing down the bone or similar,
    // but in Three.js Euler rotations depend on the bind pose.
    // Assuming standard T-Pose where Z rotation brings arms down/up.

    // Left Upper Arm (Sides)
    if (leftUpperArm) {
      // Rotation Z: +80 deg (1.4 rad) usually brings arm down to side in T-pose
      // The prompt says "Sides" Z ~80°.
      leftUpperArm.rotation.z = THREE.MathUtils.lerp(leftUpperArm.rotation.z, Math.PI / 180 * 80, lerpFactor);
      // Rotation X: ~20 deg (0.35 rad) brings arm forward
      leftUpperArm.rotation.x = THREE.MathUtils.lerp(leftUpperArm.rotation.x, Math.PI / 180 * 20, lerpFactor);
    }

    // Right Upper Arm (Sides - Mirrored)
    if (rightUpperArm) {
      // Rotation Z: -80 deg (-1.4 rad)
      rightUpperArm.rotation.z = THREE.MathUtils.lerp(rightUpperArm.rotation.z, -(Math.PI / 180 * 80), lerpFactor);
      // Rotation X: ~20 deg (0.35 rad)
      rightUpperArm.rotation.x = THREE.MathUtils.lerp(rightUpperArm.rotation.x, Math.PI / 180 * 20, lerpFactor);
    }

    // Left Lower Arm (Inward)
    if (leftLowerArm) {
      // LowerArm Z ~20 deg ?? Usually Y rotation bends elbow in standard rig.
      // But prompt says "LowerArm Z ~20° (Inward)". Let's follow instruction.
      // If Z rotates the forearm, so be it.
      leftLowerArm.rotation.z = THREE.MathUtils.lerp(leftLowerArm.rotation.z, Math.PI / 180 * 20, lerpFactor);
    }

    // Right Lower Arm (Inward - Mirrored)
    if (rightLowerArm) {
       // Mirroring Z
       rightLowerArm.rotation.z = THREE.MathUtils.lerp(rightLowerArm.rotation.z, -(Math.PI / 180 * 20), lerpFactor);
    }

    // 2. Breathing (Sine wave on Spine X-axis)
    if (spine) {
      spine.rotation.x = Math.sin(time * 2.0) * 0.05;
    }

    // 3. Head Drift
    if (head) {
        // Subtle Perlin-like noise or compound sine
        head.rotation.y = Math.sin(time * 0.5) * 0.05 + Math.sin(time * 0.3) * 0.02;
        head.rotation.x = Math.sin(time * 0.7) * 0.02;
    }

    // 4. Blinking
    if (face && face.morphTargetInfluences && face.morphTargetDictionary) {
        const blinkIndex = face.morphTargetDictionary['blink'] ?? face.morphTargetDictionary['Blink'];
        if (blinkIndex !== undefined) {
            const t = state.clock.elapsedTime;
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
