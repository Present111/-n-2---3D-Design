//HOOK TẢI FILE GLB
// -----------------------------------
// hooks/useGLTFModel.js
import { useGLTF } from "@react-three/drei";

export default function useGLTFModel(path) {
  const { scene } = useGLTF(path);
  return scene.clone();
}
