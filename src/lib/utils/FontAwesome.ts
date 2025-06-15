import L from "leaflet";
import "$styles/icons.scss"

import ripples from "$assets/animated/ripples.svg?raw";

interface FontAwesomeIcons {
  LocationCrosshairs: L.Icon;
}

const LocationCrosshairs = L.divIcon({
  className: "fa location-crosshairs",
  html: ripples,
  iconSize: [64, 64], // size of the icon (width, height)
  iconAnchor: [32, 63], // point of the icon which corresponds to the marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
  //   shadowUrl: "path/to/my-icon-shadow.png", // Optional
  //   shadowSize: [40, 40], // Optional
  //   shadowAnchor: [10, 40], // Optional
});

const fa = {
  LocationCrosshairs,
};

export default fa;

export type FontAwesomeIconType = keyof FontAwesomeIcons;
