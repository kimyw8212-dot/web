"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useMemo } from "react";
import * as THREE from "three";

const CAMERA_DISTANCE = 5;
const CAMERA_FOV = 35;
// 카메라 기준 세로 시야 크기(scene 단위). 드래그로 모델을 회전시켜도 위/아래가
// 화면 밖으로 잘리지 않도록, 모델의 대각선(외접 구 지름)이 이 값을 넘지 않게 한다.
const VISIBLE_HEIGHT = 2 * CAMERA_DISTANCE * Math.tan((CAMERA_FOV * Math.PI) / 360);

type ModelProps = {
  src: string;
  rotation: [number, number, number];
};

function Model({ src, rotation }: ModelProps) {
  const { scene } = useGLTF(src);

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const diagonal = size.length() || 1;

    scene.position.set(-center.x, -center.y, -center.z);

    return Math.min(2.4 / maxDim, (VISIBLE_HEIGHT * 0.95) / diagonal);
  }, [scene]);

  return (
    <group rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

type ModelViewerProps = {
  src: string;
  /** [x, y, z] 라디안 단위 회전값 (드래그로 제어) */
  rotation: [number, number, number];
};

export function ModelViewer({ src, rotation }: ModelViewerProps) {
  return (
    <Canvas
      style={{ pointerEvents: "none" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, CAMERA_DISTANCE], fov: CAMERA_FOV }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} />
      <directionalLight position={[-5, -3, -4]} intensity={0.5} />
      <Suspense fallback={null}>
        <Model src={src} rotation={rotation} />
      </Suspense>
    </Canvas>
  );
}
