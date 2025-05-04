import React from "react";

export default function HouseFrame() {
  return (
    <>
      {/* Sàn */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 10]} />
        <meshStandardMaterial color="#eeeeee" />
      </mesh>

      {/* Cột */}
      {[
        [-4.5, 2, -4.5],
        [4.5, 2, -4.5],
        [-4.5, 2, 4.5],
        [4.5, 2, 4.5],
      ].map((pos, index) => (
        <mesh key={index} position={pos} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 4, 16]} />
          <meshStandardMaterial color="#888" />
        </mesh>
      ))}

      {/* Mái nghiêng */}
      <mesh position={[0, 4.2, 0]} rotation={[-0.3, 0, 0]} castShadow>
        <boxGeometry args={[10, 0.3, 10]} />
        <meshStandardMaterial color="#b53737" />
      </mesh>
    </>
  );
}
