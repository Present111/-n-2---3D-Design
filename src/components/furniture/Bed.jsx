import React from "react";
import useGLTFModel from "../hooks/useGLTFModel";

export default function Chair({ position = [0, 0, 0], scale = 1 }) {
  const model = useGLTFModel("/models/bed.glb");
  return <primitive object={model} position={position} scale={scale} />;
}
