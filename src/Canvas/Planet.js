import React, { useEffect, useRef } from "react";
import useStore from "../store";
import TWEEN from "@tweenjs/tween.js";
import { useThree, useFrame, extend } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

export default function Planet({ planet }) {
  const ref = useRef();
  const [setContentPage] = useStore((state) => [state.setContentPage]);

  const clickPlanet = (page) => {
    setContentPage(page);
  };

  useEffect(() => {
    if (window.scrollY === 0 && planet.page === "overview") {
      setContentPage("overview");
    }
    new TWEEN.Tween({ y: 0 })
      .to({ y: 360 }, Math.random() * 400 * 60 * 1000)
      .repeat(-1)
      .onUpdate((d) => {
        ref.current.rotation.set(
          ref.current.rotation.x,
          d.y,
          ref.current.rotation.z
        );
        ref.current?.updateMatrix();
      })
      .start();
  }, []);

  useFrame((state, delta) => {}, 1);

  return (
    <Sphere
      ref={ref}
      {...planet}
      onClick={() => clickPlanet(planet.page)}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      <meshBasicMaterial color={planet.color} map={planet.texture} />
    </Sphere>
  );
}
