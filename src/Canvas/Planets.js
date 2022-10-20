import React, { useEffect } from "react";
import useStore from "../store";

import { Sphere } from "@react-three/drei";

export default function Planets({ planets }) {
  const [setContentPage] = useStore((state) => [state.setContentPage]);

  const clickPlanet = (page) => {
    setContentPage(page);
  };

  useEffect(() => {
    if (window.scrollY === 0) {
      setContentPage('overview');
    }
  }, []);

  return (
    <>
      {planets.map((sphere, index) => (
        <Sphere
          {...sphere}
          key={index}
          onClick={() => clickPlanet(sphere.page)}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "")}
        >
          <meshBasicMaterial color={sphere.color} map={sphere.texture} />
        </Sphere>
      ))}
    </>
  );
}
