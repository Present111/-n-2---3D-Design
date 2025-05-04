import React from "react";

export default function Column({
  position = [0, 0, 0],
  height = 3.8,
  clippingPlanes = [],
}) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[0.15, 0.15, height, 16]} />
      <meshStandardMaterial
        color="#cccccc"
        clippingPlanes={clippingPlanes}
        clipShadows
      />
    </mesh>
  );
}
