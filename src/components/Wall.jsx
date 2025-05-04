import React from "react";

export default function Wall({
  position = [0, 0, 0],
  size = [10, 3, 0.2],
  clippingPlanes = [],
}) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#ffffff"
        clippingPlanes={clippingPlanes}
        clipShadows
      />
    </mesh>
  );
}
