import React from "react";
import Floor from "./Floor";
import Column from "./Column";
import Wall from "./Wall";
import Slab from "./Slab";

export default function HouseBuilder({ floors = 3 }) {
  const floorHeight = 4;
  const columns = [
    [-4.5, 2, -4.5],
    [4.5, 2, -4.5],
    [-4.5, 2, 4.5],
    [4.5, 2, 4.5],
  ];

  return (
    <>
      {Array.from({ length: floors }).map((_, i) => {
        const y = i * floorHeight;
        return (
          <group key={i}>
            <Floor position={[0, y, 0]} />
            {columns.map((pos, idx) => (
              <Column key={idx} position={[pos[0], y + 2, pos[2]]} />
            ))}
            {/* Tường bao 2 mặt */}
            <Wall position={[0, y + 1.5, -5]} />
            <Wall position={[0, y + 1.5, 5]} />
            {/* Cầu thang giả */}
            <Slab position={[0, y + 0.15, 0]} />
          </group>
        );
      })}
    </>
  );
}
