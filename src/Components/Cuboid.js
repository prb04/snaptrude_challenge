/* eslint-disable react-hooks/exhaustive-deps */
import {
  Engine,
  Color4,
  Vector3,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  StandardMaterial,
  Texture,
} from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

const Cuboid = ({ src }) => {
  const canvasRef = useRef();

  const createScene = (engine, canvas) => {
    const scene = new Scene(engine);

    // Sets background color
    scene.clearColor = new Color4(0, 0, 0, 0);

    // Create camera
    const camera = new ArcRotateCamera(
      "Camera",
      -Math.PI / 2,
      Math.PI / 3,
      4,
      Vector3.Zero(),
      scene
    );
    camera.attachControl(canvas, true);

    // Creating light
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    light.intensity = 1.6;

    // Creating material
    const material = new StandardMaterial("material", scene);
    const texture = new Texture(src, scene);
    material.diffuseTexture = texture;

    // Creating a box
    const options = {
      // wrap: true,
      width: 1,
      height: 1,
      depth: 2,
    };

    const box = MeshBuilder.CreateBox("box", options, scene);
    box.material = material;

    return scene;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);

    const scene = createScene(engine, canvas);

    engine.runRenderLoop(() => {
      scene.render();
    });

    window.addEventListener("resize", () => {
      createScene(engine, canvas);
    });

    return () => {
      engine.stopRenderLoop();
      window.removeEventListener("resize", () => {
        createScene(engine, canvas);
      });
      scene.dispose();
      engine.dispose();
    };
  }, []);

  return (
    <canvas
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: "50%",
        left: "50%",
        translate: "-50% -50%",
      }}
      ref={canvasRef}
    />
  );
};

export default Cuboid;
