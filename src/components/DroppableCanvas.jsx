// src/components/DroppableCanvas.jsx
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "@react-three/drei";
import { useDrop } from "react-dnd";
import * as THREE from "three";

import Chair from "./furniture/Chair";
import Bed from "./furniture/Bed";
import Table from "./furniture/Table";
import Fridge from "./furniture/Fridge";
import Car from "./furniture/Car";

function GroundPlane({ onMove }) {
  const planeRef = useRef();
  const { gl, camera } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    function handleDrag(event) {
      if (!event.buttons) return;
      const rect = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(planeRef.current);
      if (intersects.length) {
        onMove(intersects[0].point);
      }
    }

    gl.domElement.addEventListener("pointermove", handleDrag);
    return () => gl.domElement.removeEventListener("pointermove", handleDrag);
  }, [gl, camera, onMove]);

  return (
    <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#eeeeee" />
    </mesh>
  );
}

export default function DroppableCanvas() {
  const [objects, setObjects] = useState([]);
  const [dropPosition, setDropPosition] = useState([0, 0.1, 0]);
  const [selectedId, setSelectedId] = useState(null);
  const orbitRef = useRef();
  const draggingRef = useRef(false);

  const [, drop] = useDrop(() => ({
    accept: "furniture",
    drop: (item) => {
      setObjects((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: item.type,
          position: dropPosition,
          scale: 0.4,
        },
      ]);
    },
  }));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "x") {
        orbitRef.current.enabled = true;
      }

      if (!selectedId) return;
      setObjects((prev) =>
        prev.map((obj) =>
          obj.id === selectedId
            ? {
                ...obj,
                scale:
                  e.key === "1"
                    ? obj.scale * 1.1
                    : e.key === "2" && obj.scale > 0.1
                    ? obj.scale * 0.9
                    : obj.scale,
              }
            : obj
        )
      );
    };

    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === "x") {
        orbitRef.current.enabled = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [selectedId]);

  const renderObject = (obj) => {
    const props = { position: obj.position, key: obj.id, scale: obj.scale };
    const content = {
      chair: <Chair {...props} />,
      bed: <Bed {...props} />,
      table: <Table {...props} />,
      fridge: <Fridge {...props} />,
      car: <Car {...props} />,
    }[obj.type];

    return (
      <TransformControls
        key={obj.id}
        mode="translate"
        onPointerDown={(e) => {
          e.stopPropagation();
          draggingRef.current = true;
          setSelectedId(obj.id);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
      >
        {content}
      </TransformControls>
    );
  };

  const handleMove = (point) => {
    if (!draggingRef.current || !selectedId) return;
    setObjects((prev) =>
      prev.map((o) =>
        o.id === selectedId ? { ...o, position: [point.x, 0.1, point.z] } : o
      )
    );
  };

  return (
    <div ref={drop} style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows camera={{ position: [10, 10, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <gridHelper args={[50, 50]} />
        <GroundPlane onMove={handleMove} />
        {objects.map(renderObject)}
        <OrbitControls ref={orbitRef} enabled={false} />
      </Canvas>
    </div>
  );
}
