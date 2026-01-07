import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';

export function useMetiAnimations(root: THREE.Object3D | undefined) {
    const [animations, setAnimations] = useState<THREE.AnimationClip[]>([]);
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    useEffect(() => {
        if (!root) return;

        const loader = new FBXLoader();
        const animConfig = [
            { name: 'HappyIdle', path: '/animations/HappyIdle.fbx' },
            { name: 'Happy', path: '/animations/Happy.fbx' },
            { name: 'Bashful', path: '/animations/Bashful.fbx' },
            { name: 'Bored', path: '/animations/Bored.fbx' },
            { name: 'Talking', path: '/animations/Talking.fbx' },
            { name: 'Talking1', path: '/animations/Talking1.fbx' },
            { name: 'LookAround', path: '/animations/LookAround.fbx' },
            { name: 'SalsaDancing', path: '/animations/SalsaDancing.fbx' },
            { name: 'DancingMaraschinoStep', path: '/animations/DancingMaraschinoStep.fbx' },
        ];

        const loadPromises = animConfig.map((config) => {
            return new Promise<THREE.AnimationClip | null>((resolve) => {
                loader.load(
                    config.path,
                    (fbx) => {
                        if (fbx.animations && fbx.animations.length > 0) {
                            const clip = fbx.animations[0];
                            clip.name = config.name;

                            // Normalization and Validation
                            cleanAnimationClip(clip, root);

                            resolve(clip);
                        } else {
                            resolve(null);
                        }
                    },
                    undefined,
                    (err) => {
                        console.warn(`[useMetiAnimations] Failed to load ${config.path}`, err);
                        resolve(null);
                    }
                );
            });
        });

        Promise.all(loadPromises).then((results) => {
            if (!isMountedRef.current) return;
            const validClips = results.filter((clip): clip is THREE.AnimationClip => clip !== null);
            setAnimations(validClips);
        });

    }, [root]);

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
