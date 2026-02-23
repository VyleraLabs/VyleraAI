"use client";

import { Canvas } from "@react-three/fiber";
import { MetiMascot } from "./MetiMascot";

export default function TechnicalHeroCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <MetiMascot />
        </Canvas>
    );
}
