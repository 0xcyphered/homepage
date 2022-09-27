import React, { useRef, useState } from "react";
import * as THREE from "three";
import { Stars, PointMaterial, useTexture } from "@react-three/drei";

import { useFrame } from "@react-three/fiber";

export default function Box() {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const texture = useTexture(
    "https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"
  );

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta));

  const s = 250;

  ref.current?.updateMatrix();

  return (
    <mesh
      rotation={[
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ]}
      position={[
        15000 * (2.0 * Math.random() - 1.0),
        15000 * (2.0 * Math.random() - 1.0),
        15000 * (2.0 * Math.random() - 1.0),
      ]}
      matrixAutoUpdate={false}
      ref={ref}
      // onClick={(event) => click(!clicked)}
      // onPointerOver={(event) => hover(true)}
      // onPointerOut={(event) => hover(false)}
    >
      <Stars
        radius={1000}
        depth={1}
        count={40}
        factor={100}
        saturation={10000}
        fade
        speed={1}
      />
      <PointMaterial size={0.05} transparent={true} map={texture} />
    </mesh>
  );
}
