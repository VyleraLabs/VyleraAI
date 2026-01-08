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
