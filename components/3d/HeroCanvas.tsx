"use client";

import { Canvas } from "@react-three/fiber";
import { MetiMascot } from "@/components/3d/MetiMascot";

export default function HeroCanvas({ isHovered }: { isHovered: boolean }) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} frameloop={isHovered ? "always" : "demand"}>
            <MetiMascot />
        </Canvas>
    );
}
