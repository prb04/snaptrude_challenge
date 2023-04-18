import React, { useState } from "react";
import Map from "./Components/Map";
import Cuboid from "./Components/Cuboid";

const App = () => {
  const [imgSrc, setImgSrc] = useState("");
  console.log(imgSrc);
  return (
    <div className="flex h-screen">
      <Map setImgSrc={setImgSrc} />
      <div className="bg-black">
        <Cuboid src={imgSrc} />
      </div>
    </div>
  );
};

export default App;
