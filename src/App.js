import React from "react";
import { Canvas } from "@react-three/fiber";
import CanvasElement from "./Canvas";

export default function App() {
  return (
    <Canvas>
      <CanvasElement />
    </Canvas>
  );
}
