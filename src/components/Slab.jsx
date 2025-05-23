import React from "react";

export default function Slab({
  position = [0, 0, 0],
  size = [2, 0.1, 1],
  clippingPlanes = [],
}) {
  return (
    <mesh position={position} receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#999999"
        clippingPlanes={clippingPlanes}
        clipShadows
      />
    </mesh>
  );
}
