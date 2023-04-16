import { createStore } from "redux";

function mapStateReducer(state, action) {
  switch (action.type) {
    case "setViewState":
      return { ...state, viewState: action.payload };

    default:
      return state;
  }
}

const defaultMapState = {
  mapStyle: "mapbox://styles/mapbox/dark-v11",
  viewState: {
    longitude: 77.64068,
    latitude: 12.979329,
    zoom: 14,
    pitch: 2,
  },
};

export default createStore(mapStateReducer, defaultMapState);
