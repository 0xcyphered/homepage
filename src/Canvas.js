import React, { useRef, useState } from "react";
import Box from "./Box";
import * as THREE from "three";
import { useThree, extend } from "@react-three/fiber";

import {
  PerspectiveCamera,
  FlyControls,
  Sphere,
  Stats,
  useTexture,
} from "@react-three/drei";

import { Lensflare, LensflareElement } from "three/addons/objects/Lensflare.js";

extend({ Lensflare, LensflareElement });

const clock = new THREE.Clock();

export default function Canvas() {

  const lights = [
    {
      init: false,
      distance: 20000,
      color: 0xffffff,
      flareColor: 0xffffff,
      position: [0, 0, -1000],
      hsl: [0.55, 0.9, 0.5],
    },
    {
      init: false,
      distance: 12000,
      color: "#96008f",
      flareColor: "#fc95f7",
      position: [15000, 15000, -1000],
      hsl: [0.08, 0.8, 0.5],
    },
  ];
  const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight);
  const { gl, scene, camera, controls } = useThree();
  const [textureFlare0, textureFlare3, earthTexture, moonTexture, sunTexture] = useTexture([
    "/lensflare0.png",
    "/lensflare3.png",
    "/earth_atmos_2048.jpg",
    "/moon_1024.jpg",
    "/2k_sun.jpg",
  ]);

  const spheres = [
    {
      init: false,
      texture: sunTexture,
      args: [200],
      position: [0, 0, -1000],
    },
    {
      init: false,
      texture: earthTexture,
      args: [200],
      position: [1000, 0, -300],
    },
    {
      init: false,
      texture: moonTexture,
      args: [100],
      position: [150, 0, -2000],
    },
  ];
  gl.setSize(window.innerWidth, window.innerHeight);

  React.useEffect(() => {
    requestAnimationFrame(init);
    requestAnimationFrame(animate);
    onWindowResize();
  }, []);

  function init() {
    gl.setClearColor(new THREE.Color("#1c1624"));
    gl.setPixelRatio(window.devicePixelRatio);
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.antialias = true;

    scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
    scene.fog = new THREE.Fog(scene.background, 3500, 25000);

    window.addEventListener("resize", onWindowResize);
    onWindowResize();
  }

  function animate() {
    gl.render(scene, camera);
    const delta = clock.getDelta();
    controls?.update(delta);
  }

  function onWindowResize() {
    gl.setSize(window.innerWidth, window.innerHeight);
    setAspect(window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
  }

  const addFlare = (index) => (flare) => {
    if (lights[index].init) {
      return;
    }
    lights[index].init = true;
    flare.addElement(
      new LensflareElement(
        textureFlare0,
        700,
        0,
        new THREE.Color(lights[index].color)
      )
    );
    flare.addElement(
      new LensflareElement(
        textureFlare3,
        60,
        0.6,
        new THREE.Color(lights[index].flareColor)
      )
    );
    flare.addElement(
      new LensflareElement(
        textureFlare3,
        70,
        0.7,
        new THREE.Color(lights[index].flareColor)
      )
    );
    flare.addElement(
      new LensflareElement(
        textureFlare3,
        120,
        0.9,
        new THREE.Color(lights[index].flareColor)
      )
    );
    flare.addElement(
      new LensflareElement(
        textureFlare3,
        70,
        1,
        new THREE.Color(lights[index].flareColor)
      )
    );
  };

  return (
    <>
      <PerspectiveCamera
        makeDefault
        manual
        onUpdate={(c) => c.updateProjectionMatrix()}
        position={[0, 0, 250]}
        fov={40}
        aspect={aspect}
        near={1}
        far={15000}
      />
      <FlyControls
        autoForward={false}
        dragToLook={false}
        movementSpeed={2500}
        rollSpeed={Math.PI / 6}
        makeDefault
      />
      <directionalLight
        position={[0, -1, 0]}
        hsl={[0.1, 0.7, 0.5]}
        color={new THREE.Color(0xffffff)}
        intensity={0.05}
      />
      {lights.map((light, index) => (
        <pointLight {...light} intensity={1.5}>
          <lensflare onUpdate={addFlare(index)} />
        </pointLight>
      ))}
      {spheres.map((sphere, index) => (
        <Sphere {...sphere}>
          <meshBasicMaterial color={sphere.color} map={sphere.texture} />
        </Sphere>
      ))}
      {new Array(3000).fill("x").map((_, i) => (
        <Box position={[-1.2, 0, 0]} key={i} />
      ))}
      <Stats />
    </>
  );
}
