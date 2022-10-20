import React, { useRef } from "react";
import { Stars, PointMaterial, useTexture } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

export default function StarBox() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const texture = useTexture("/sp2.png");

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));

  ref.current?.updateMatrix();

  return (
    <mesh
      rotation={[
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ]}
      position={[
        ((Math.random() * 100).toFixed() % 2 ? 1 : -1) *
          (250000 * (2.0 * Math.random() - 1.0) + 450000),
        ((Math.random() * 100).toFixed() % 2 ? 1 : -1) *
          (250000 * (2.0 * Math.random() - 1.0) + 450000),
        ((Math.random() * 100).toFixed() % 2 ? 1 : -1) *
          (250000 * (2.0 * Math.random() - 1.0) + 450000),
      ]}
      matrixAutoUpdate={false}
      ref={ref}
    >
      <Stars
        radius={250000}
        depth={1}
        count={400}
        factor={100}
        saturation={10000}
        fade
        speed={1.5}
      />
      <PointMaterial size={0.05} transparent={true} map={texture} />
    </mesh>
  );
}
