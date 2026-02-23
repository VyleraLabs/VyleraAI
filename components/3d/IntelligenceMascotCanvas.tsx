"use client";

import { Canvas } from "@react-three/fiber";
import { MetiMascot } from "./MetiMascot";

export default function IntelligenceMascotCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#64ffda" />
            <MetiMascot />
        </Canvas>
    );
}
