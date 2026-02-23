/* PROJECT: Vylera Sentient OS
  COMPONENT: MetiMascot (Refactored to Sovereign Neural Core)
  AUTHOR: Vylera Labs
*/

import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function MetiMascot() {
    const group = useRef<THREE.Group>(null)
    const [systemState] = useState<'SECURE' | 'SYNCING' | 'ALERT'>('SECURE')

    // Color Logic
    const colors = {
        SECURE: '#00f0ff', // Cyan/Deep Blue
        SYNCING: '#ffa500', // Orange
        ALERT: '#ff0000',   // Red
    }

    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (group.current) {
            // Core Rotation
            group.current.rotation.y = t * 0.2
            group.current.rotation.z = Math.sin(t * 0.5) * 0.1
        }
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color={colors[systemState]} />

            <group ref={group} position={[0, 0, 0]} scale={2}>
                {/* CORE NEURAL MESH (Sphere of Points) */}
                <points>
                    <sphereGeometry args={[1, 64, 64]} />
                    <pointsMaterial
                        size={0.02}
                        color={colors[systemState]}
                        transparent
                        opacity={0.8}
                        sizeAttenuation
                    />
                </points>

                {/* INNER CORE (Solid Glow) */}
                <mesh>
                    <sphereGeometry args={[0.5, 32, 32]} />
                    <meshBasicMaterial color={colors[systemState]} transparent opacity={0.3} wireframe />
                </mesh>

                {/* ORBITAL RINGS */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[1.2, 1.25, 64]} />
                    <meshBasicMaterial color={colors[systemState]} side={THREE.DoubleSide} transparent opacity={0.2} />
                </mesh>
            </group>
        </>
    )
}
