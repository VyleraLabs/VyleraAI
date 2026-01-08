import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

export function useMetiAnimations(gltfAnimations: THREE.AnimationClip[] | undefined, root: THREE.Object3D | undefined) {
    const [animations, setAnimations] = useState<THREE.AnimationClip[]>([]);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    useEffect(() => {
        // Safety: If animations is empty, log it once and stop all further loading attempts
        // to prevent the WebGL Context Lost crash.
        if (!gltfAnimations || gltfAnimations.length === 0) {
            console.warn('[useMetiAnimations] No animations found in GLTF. Stopping loader.');
            return;
        }

        if (!root) return;

        // Process embedded animations directly
        const processedClips: THREE.AnimationClip[] = [];

        gltfAnimations.forEach(clip => {
             // Clone the clip to avoid modifying the original GLTF asset directly if used elsewhere
             const newClip = clip.clone();

             // Normalize and Validate Bones
             cleanAnimationClip(newClip, root);

             processedClips.push(newClip);
        });

        if (isMountedRef.current) {
            setAnimations(processedClips);
        }

    }, [gltfAnimations, root]);

    return { animations };
}

function cleanAnimationClip(clip: THREE.AnimationClip, root: THREE.Object3D) {
    const validTracks: THREE.KeyframeTrack[] = [];

    clip.tracks.forEach((track) => {
        // Track name format: "BoneName.property"
        const dotIndex = track.name.lastIndexOf('.');
        if (dotIndex === -1) return; // Invalid track name

        let boneName = track.name.substring(0, dotIndex);
        const property = track.name.substring(dotIndex + 1);

        // Task 1: Normalization (Strip 'mixamorig' prefix)
        let cleanBoneName = boneName;
        if (boneName.startsWith('mixamorig')) {
            cleanBoneName = boneName.replace('mixamorig', '');
        }

        // Task 2: Global Bone Search (Validation)
        // Check if the normalized bone name exists in the model
        let targetBone = root.getObjectByName(cleanBoneName);

        // Task 3: J_Bip Bone Mapping (Standardization)
        // If the clean name (e.g. "Hips") isn't found, try "J_Bip_C_Hips" etc.
        // Simple mapping assumption based on common J_Bip naming conventions
        if (!targetBone) {
             const jBipMap: {[key: string]: string} = {
                 'Hips': 'J_Bip_C_Hips',
                 'Spine': 'J_Bip_C_Spine',
                 'Chest': 'J_Bip_C_Chest',
                 'UpperChest': 'J_Bip_C_UpperChest',
                 'Neck': 'J_Bip_C_Neck',
                 'Head': 'J_Bip_C_Head',
                 'LeftShoulder': 'J_Bip_L_Shoulder',
                 'LeftUpperArm': 'J_Bip_L_UpperArm',
                 'LeftLowerArm': 'J_Bip_L_LowerArm',
                 'LeftHand': 'J_Bip_L_Hand',
                 'RightShoulder': 'J_Bip_R_Shoulder',
                 'RightUpperArm': 'J_Bip_R_UpperArm',
                 'RightLowerArm': 'J_Bip_R_LowerArm',
                 'RightHand': 'J_Bip_R_Hand',
                 'LeftUpperLeg': 'J_Bip_L_UpperLeg',
                 'LeftLowerLeg': 'J_Bip_L_LowerLeg',
                 'LeftFoot': 'J_Bip_L_Foot',
                 'RightUpperLeg': 'J_Bip_R_UpperLeg',
                 'RightLowerLeg': 'J_Bip_R_LowerLeg',
                 'RightFoot': 'J_Bip_R_Foot',
                 // Add toes/fingers if needed
             };

             const jBipName = jBipMap[cleanBoneName];
             if (jBipName) {
                 targetBone = root.getObjectByName(jBipName);
                 if (targetBone) {
                     cleanBoneName = jBipName;
                 }
             }
        }

        if (targetBone) {
            // Found: Use the cleaned name
            track.name = `${cleanBoneName}.${property}`;
            validTracks.push(track);
        } else {
            // Fallback 1: Check if the original name exists
            targetBone = root.getObjectByName(boneName);
            if (targetBone) {
                // Original name is valid
                validTracks.push(track);
            } else {
                // Fallback 2: Inverse Check (Add 'mixamorig' prefix)
                // If model has 'mixamorigHips' but anim has 'Hips'
                const mixamoName = `mixamorig${boneName}`;
                targetBone = root.getObjectByName(mixamoName);

                if (targetBone) {
                    track.name = `${mixamoName}.${property}`;
                    validTracks.push(track);
                } else {
                    // Neither exists: Drop the track to prevent "No target node found"
                    // console.debug(`[useMetiAnimations] Dropped track: ${track.name} (Target not found)`);
                }
            }
        }
    });

    clip.tracks = validTracks;
}
