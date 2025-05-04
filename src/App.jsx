// App.jsx
import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import HouseFrame from "./components/HouseFrame.jsx";

function CustomGrid() {
  const { scene } = useThree();

  useEffect(() => {
    const grid = new THREE.GridHelper(20, 20);
    scene.add(grid);

    return () => scene.remove(grid); // Clean up nếu component unmount
  }, [scene]);

  return null;
}

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <CustomGrid /> {/* Thêm Grid thủ công */}
        <HouseFrame />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
