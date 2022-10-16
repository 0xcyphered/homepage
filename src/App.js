import React from "react";
import { Canvas } from "@react-three/fiber";
import CanvasElement from "./Canvas";
import Modal from "./Modal";
import "./App.css";

export default function App() {
  return (
    <div className="canvas">
      <div className="content-container">
        <Modal />
      </div>
      <Canvas>
        <CanvasElement />
      </Canvas>
    </div>
  );
}
