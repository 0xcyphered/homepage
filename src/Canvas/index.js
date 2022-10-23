import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useThree, useFrame, extend } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";
import { Lensflare, LensflareElement } from "three/addons/objects/Lensflare.js";
import {
  PerspectiveCamera,
  OrbitControls,
  Stats,
  useTexture,
} from "@react-three/drei";
import BackgroundStars from "./BackgroundStars";
import Planet from "./Planet";

extend({ Lensflare, LensflareElement });

const canvasState = {
  movementId: "",
  currentPageIndex: "",
};

export default function Canvas() {
  const lights = [
    {
      init: false,
      distance: 20000,
      color: 0xffffff,
      flareColor: 0xffffff,
      position: [0, 0, -4200 * 4],
      hsl: [0.55, 0.9, 0.5],
    },
    {
      init: false,
      distance: 12000,
      color: "#96008f",
      flareColor: "#fc95f7",
      position: [1000000, 1000000, -1000000],
      hsl: [0.08, 0.8, 0.5],
    },
  ];
  const [aspect, setAspect] = useState(window.innerWidth / window.innerHeight);
  const { gl, scene, camera, controls } = useThree();
  const [
    textureFlare0,
    textureFlare3,
    mercuryTexture,
    venusTexture,
    earthTexture,
    marsTexture,
    jupiterTexture,
    saturnTexture,
    uranusTexture,
    neptuneTexture,
    sunTexture,
  ] = useTexture([
    "/lensflare0.png",
    "/lensflare3.png",
    "/2k_mercury.jpg",
    "/2k_venus_surface.jpg",
    "/earth_atmos_2048.jpg",
    "/2k_mars.jpg",
    "/2k_jupiter.jpg",
    "/2k_saturn.jpg",
    "/2k_uranus.jpg",
    "/2k_neptune.jpg",
    "/2k_sun.jpg",
  ]);

  const planets = [
    {
      page: "overview",
      texture: sunTexture,
      args: [4200],
      // args: [130000],
      position: [0, 0, -4200 * 4],
      cameraPosition: [0, 0, 0],
    },
    {
      page: "about",
      texture: mercuryTexture,
      args: [50],
      position: [18000, 0, -4200 * 4],
      cameraPosition: [18000 + 4 * 50, 0, -4200 * 4 + 4 * 50],
    },
    {
      page: "contact",
      texture: venusTexture,
      args: [120],
      position: [40000, 0, -4200 * 4],
      cameraPosition: [40000 + 4 * 120, 0, -4200 * 4 + 4 * 120],
    },
    {
      page: "open-source",
      texture: earthTexture,
      args: [130],
      position: [60000, 0, -4200 * 4],
      cameraPosition: [60000 + 4 * 130, 0, -4200 * 4 + 4 * 130],
    },
    {
      page: "contact",
      texture: marsTexture,
      args: [69],
      position: [90000, 0, -4200 * 4],
      cameraPosition: [90000 + 4 * 69, 0, -4200 * 4 + 4 * 69],
    },
    {
      page: "contact",
      texture: jupiterTexture,
      args: [1400],
      position: [150000, 0, -4200 * 4],
      cameraPosition: [150000 + 4 * 1400, 0, -4200 * 4 + 4 * 1400],
    },
    {
      page: "contact",
      texture: saturnTexture,
      args: [1200],
      position: [220000, 0, -4200 * 4],
      cameraPosition: [220000 + 4 * 1200, 0, -4200 * 4 + 4 * 1200],
    },
    {
      page: "contact",
      texture: uranusTexture,
      args: [510],
      position: [310000, 0, -4200 * 4],
      cameraPosition: [310000 + 4 * 510, 0, -4200 * 4 + 4 * 510],
    },
    {
      page: "contact",
      texture: neptuneTexture,
      args: [490],
      position: [420000, 0, -4200 * 4],
      cameraPosition: [420000 + 4 * 490, 0, -4200 * 4 + 4 * 490],
    },
  ];

  gl.setSize(window.innerWidth, window.innerHeight);

  React.useEffect(() => {
    requestAnimationFrame(init);
    // requestAnimationFrame(animate);
  }, []);

  useFrame((state, time) => {
    const newPageIndex = Math.ceil(window.scrollY / window.innerHeight);
    if (newPageIndex != canvasState.currentPageIndex) {
      canvasState.currentPageIndex = newPageIndex;
      const newMovementId = Math.random();
      canvasState.movementId = newMovementId;
      const focusPlanet =
        planets[newPageIndex > 0 ? newPageIndex - 1 : newPageIndex];
      // controls.disable = newPageIndex > 0;
      // controls.enabled = newPageIndex === 0;
      // controls.reset()
      // controls.update()
      moveCamera(
        newMovementId,
        focusPlanet.cameraPosition,
        focusPlanet.position
      );
    }
    TWEEN.update();
    gl.render(scene, camera);
    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();
  }, 1);

  function init() {
    gl.setClearColor(new THREE.Color("#1c1624"));
    gl.setPixelRatio(window.devicePixelRatio);
    gl.outputEncoding = THREE.sRGBEncoding;
    gl.antialias = true;

    scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
    scene.fog = new THREE.Fog(scene.background, 1, 1000000);

    window.addEventListener("resize", onWindowResize);
    onWindowResize();
    document.querySelector(".loading-frame").style.display = "none";
  }

  function animate() {
    // gl.render(scene, camera);
    // camera.updateMatrixWorld();
    // camera.updateProjectionMatrix();
    requestAnimationFrame(animate);
  }

  function moveCamera(movementId, cameraPosition, position) {
    const startPosition = camera.position.clone();
    const distanceX = cameraPosition[0] - startPosition.x;
    const distanceY = cameraPosition[1] - startPosition.y;
    const distanceZ = cameraPosition[2] - startPosition.z;
    const duration = Math.abs(distanceX) / 5;
    const cameraMoveDuration = duration / 2;

    const startRotation = camera.rotation.clone();
    camera.position.setX(startPosition.x + distanceX / 2);
    camera.position.setY(startPosition.y + distanceY / 2);
    camera.position.setZ(startPosition.z + distanceZ / 2);
    camera.lookAt(new THREE.Vector3(...position));
    const endRotation = camera.rotation.clone();
    camera.rotation.copy(startRotation);
    camera.position.copy(startPosition);

    new TWEEN.Tween(startRotation)
      .to(endRotation, cameraMoveDuration)
      // .easing(TWEEN.Easing.QuadraticK.In)
      .onUpdate((d, time) => {
        if (movementId != canvasState.movementId) {
          return;
        }
        camera.rotation.set(d.x, d.y, d.z);
      })
      .start()
      .onComplete(() => {});

    new TWEEN.Tween(startPosition)
      .to(
        {
          x: cameraPosition[0],
          y: cameraPosition[1],
          z: cameraPosition[2],
        },
        duration
      )
      // .easing(TWEEN.Easing.Quadratic.In)
      .onUpdate((d, time) => {
        if (movementId != canvasState.movementId) {
          return;
        }
        camera.position.setX(d.x);
        camera.position.setY(d.y);
        camera.position.setZ(d.z);
        if (time > 0.5) {
          camera.lookAt(new THREE.Vector3(...position));
        }
      })
      .start()
      .onComplete(() => {});
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
        fov={50}
        aspect={aspect}
        near={10}
        far={1000000}
      />
      {/* <OrbitControls camera={camera} rotateSpeed={2} makeDefault /> */}
      <directionalLight
        position={[0, -1, 0]}
        hsl={[0.1, 0.7, 0.5]}
        color={new THREE.Color(0xffffff)}
        intensity={0.05}
      />
      {lights.map((light, index) => (
        <pointLight {...light} intensity={1.5} key={index}>
          <lensflare onUpdate={addFlare(index)} />
        </pointLight>
      ))}
      {planets.map((planet, index) => (
        <Planet planet={planet} key={index}/>
      ))}
      <BackgroundStars count={200} />
      <Stats />
    </>
  );
}
