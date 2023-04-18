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
import React, { useEffect, useRef, useState } from "react";

const Cuboid = ({ src }) => {
  const [material, setMaterial] = useState(null);

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
    let material;
    if (!material) {
      material = new StandardMaterial("material", scene);
    }
    let texture;
    if (src) {
      texture = new Texture(src, scene);
    } else {
      texture = new Texture("default.png", scene);
    }
    material.diffuseTexture = texture;
    setMaterial(material);

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

  useEffect(() => {
    if (material) {
      let texture;
      if (src) {
        texture = new Texture(src, material.getScene());
      } else {
        texture = new Texture("default.png", material.getScene());
      }
      material.diffuseTexture = texture;
    }
  }, [src]);

  return (
    <canvas
      style={{
        width: "30vw",
        height: "100vh",
      }}
      ref={canvasRef}
    />
  );
};

export default Cuboid;
