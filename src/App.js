import React, { useState } from "react";
import Map from "./Components/Map";
import Cuboid from "./Components/Cuboid";

const App = () => {
  const [imgSrc, setImgSrc] = useState("");
  const [showCuboid, setShowCuboid] = useState(false);

  return (
    <div className="App">
      <Map
        setImgSrc={setImgSrc}
        showCuboid={showCuboid}
        setShowCuboid={setShowCuboid}
      />
      {showCuboid && <Cuboid src={imgSrc} />}
    </div>
  );
};

export default App;
