import React, { useRef, useState } from "react";
import * as THREE from "three";
import useStore from "./store";
import { useThree, useFrame, extend } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";

import {
  PerspectiveCamera,
  FlyControls,
  Sphere,
  Stats,
  useTexture,
} from "@react-three/drei";

export default function Planets({ planets }) {
  const [setContentPage] = useStore((state) => [state.setContentPage]);

  const clickPlanet = (page) => {
    setContentPage(page);
  };

  return (
    <>
      {planets.map((sphere, index) => (
        <Sphere
          {...sphere}
          key={index}
          onClick={() => clickPlanet(sphere.page)}
          onPointerOver={(event) => document.body.style.cursor = 'pointer'}
          onPointerOut={(event) => document.body.style.cursor = ''}
        >
          <meshBasicMaterial color={sphere.color} map={sphere.texture} />
        </Sphere>
      ))}
    </>
  );
}
