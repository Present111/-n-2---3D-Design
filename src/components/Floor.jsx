import React from "react";
import * as THREE from "three";

export default function Floor({ position = [0, 0, 0], size = [10, 0.2, 10] }) {
  const texture = new THREE.TextureLoader().load("/textures/wood.jpg");
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);

  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
