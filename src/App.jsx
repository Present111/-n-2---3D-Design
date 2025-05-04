// App.jsx
import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import HouseBuilder from "./components/HouseBuilder.jsx";

function CustomGrid() {
  const { scene } = useThree();

  useEffect(() => {
    const grid = new THREE.GridHelper(20, 20);
    scene.add(grid);
    return () => scene.remove(grid);
  }, [scene]);

  return null;
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 60 }}>
        {/* Ánh sáng */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        {/* Mặt lưới & khung nhà */}
        <CustomGrid />
        <HouseBuilder floors={3} /> {/* ✅ Dựng 3 tầng mặc định */}
        {/* Điều khiển camera */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}
