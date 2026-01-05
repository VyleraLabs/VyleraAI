'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { VRMLoaderPlugin, VRMUtils } from '@pixiv/three-vrm';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AvatarModel() {
  const gltf = useLoader(GLTFLoader, '/models/meti.vrm', (loader) => {
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });
  });

  const vrmRef = useRef<any>(null);

  useEffect(() => {
    if (gltf.userData.vrm) {
      const vrm = gltf.userData.vrm;
      vrmRef.current = vrm;
      VRMUtils.rotateVRM0(vrm); // Fix rotation for VRM 0.0 if necessary

      // Standard VRM models face +Z. Camera is at +Z looking at -Z.
      // So model should face +Z (default).
      // If we needed to rotate, we would do it here.
      // vrm.scene.rotation.y = Math.PI;
    }
  }, [gltf]);

  useFrame((state, delta) => {
    if (vrmRef.current) {
      const vrm = vrmRef.current;
      vrm.update(delta);

      // Idle Breathing Effect: subtle sine-wave rotation of hips or spine
      const t = state.clock.getElapsedTime();
      const breathingSpeed = 2; // Breaths per second (approx, scaled by PI)

      // Try to rotate hips for a more natural breathing motion
      const hips = vrm.humanoid.getNormalizedBoneNode('hips');
      if (hips) {
        // Rotate hips slightly around X axis
        const breathingAngle = Math.sin(t * breathingSpeed) * 0.02;
        hips.rotation.x = breathingAngle;

        // Also add a slight vertical movement to the whole body to simulate chest rise
        // But since we rotate hips, maybe not needed. Let's add slight position for more life.
         const yOffset = Math.sin(t * breathingSpeed) * 0.002;
         vrm.scene.position.y = yOffset;
      } else {
        // Fallback: subtle vertical position shift to simulate breathing if hips not found
        const yOffset = Math.sin(t * breathingSpeed) * 0.005;
        vrm.scene.position.y = yOffset;
      }
    }
  });

  return <primitive object={gltf.scene} position={[0, 0, 0]} />;
}

export default function AvatarCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 0.8], fov: 45 }}
      style={{ height: '100%', width: '100%' }}
      gl={{ alpha: true, antialias: true }}
    >
      {/* Lighting: Cyberpunk Studio */}
      <ambientLight intensity={0.4} />

      {/* Rim Light #00D26A */}
      <spotLight
        position={[-2, 2, -2]}
        intensity={5}
        color="#00D26A"
        angle={0.5}
        penumbra={1}
      />

      {/* Key Light Warm White */}
      <spotLight
        position={[2, 2, 2]}
        intensity={3}
        color="#FFFAF0" // Warm white
        angle={0.5}
        penumbra={1}
      />

      <OrbitControls
        target={[0, 1.4, 0]}
        enableZoom={false}
        enablePan={false}
        enableRotate={true} // Allow slight rotation to see 3D effect? Or lock it?
        // Prompt implies a "portrait" view. Let's allow rotation but keep target fixed.
      />

      <React.Suspense fallback={null}>
        <AvatarModel />
      </React.Suspense>
    </Canvas>
  );
}
