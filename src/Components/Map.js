import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import MapBox, {
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeocoderControl from "./GeoCoder";
import CameraSVG from "./SVG/Camera";
import BackSVG from "./SVG/Back";

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || "";

const Map = ({ setImgSrc, showCuboid, setShowCuboid }) => {
  const [initialView, setInitialView] = useState({
    longitude: 77.64068,
    latitude: 12.979329,
    zoom: 14,
    pitch: 2,
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const mapStyle = useSelector((s) => s.mapStyle);
  const viewState = useSelector((s) => s.viewState);
  const dispatch = useDispatch();

  const onMove = useCallback((evt) => {
    dispatch({ type: "setViewState", payload: evt.viewState });
  }, []);

  //custom logic for error handling, will work without it but, better to be safe than sorry.
  const updateLocation = (currPosition) => {
    const { longitude, latitude } = currPosition.coords;
    setInitialView({ ...initialView, longitude, latitude });
  };

  const error = (err) => {
    console.log(err);
  };

  const getCurrLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation, error, {
        enableHighAccuracy: true,
      });
    } else {
      alert("Update your browser, it doesn't support Geolocation API");
    }
  };

  useEffect(() => {
    getCurrLocation();
  }, []);

  const handleImageCapture = () => {
    if (showCuboid) {
      setShowCuboid(false);
      return;
    }
    const { longitude, latitude, zoom, pitch } = viewState;
    setImgSrc(
      `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${longitude},${latitude},${zoom},0,${pitch}/1280x720?access_token=${TOKEN}`
    );
    setShowCuboid(true);
  };

  return (
    <div>
      <MapBox
        {...viewState}
        mapboxAccessToken={TOKEN}
        onMove={onMove}
        mapStyle={mapStyle}
        style={{ width: "100vw", height: "100vh" }}
        dragRotate={true}
      >
        <button
          onClick={handleImageCapture}
          className="flex items-center gap-2 absolute z-50 right-2.5 top-4 bg-gray-300 text-center text-black w-18 h-8 rounded-sm px-2 font-bold leading-[21.82px] "
        >
          {" "}
          {showCuboid ? <BackSVG /> : <CameraSVG />}
          {showCuboid ? `Back to Map` : `Show Cuboid`}
        </button>
        {/* <Marker
          longitude={viewState.longitude}
          latitude={viewState.latitude}
          color="green"
        /> */}
        <ScaleControl />

        <NavigationControl position="bottom-right" />
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          position="bottom-right"
          onGeolocate={updateLocation}
          showAccuracyCircle={true}
          auto={true}
        />
      </MapBox>
    </div>
  );
};

export default Map;
