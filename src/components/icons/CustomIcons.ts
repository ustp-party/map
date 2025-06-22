import L from "leaflet";
import "$styles/icons.scss";

import ripples from "$assets/animated/ripples.svg?raw";
import restroomSVG from "$assets/free-icons/restroom.svg?raw";
import parkingSVG from "$assets/free-icons/parking.svg?raw";
import printerSVG from "$assets/free-icons/printer.svg?raw";

interface CustomIcons {
  LocationCrosshairs: L.Icon;
  ParkingIcon: L.Icon;
  RestroomIcon: L.Icon;
  PrintingServiceIcon: L.Icon;
  LandmarkIcon: L.Icon;
}

const icons = {
  LocationCrosshairs: L.divIcon({
    className: "fa location-crosshairs",
    html: ripples,
    iconSize: [64, 64], // size of the icon (width, height)
    iconAnchor: [32, 63], // point of the icon which corresponds to the marker's location
    popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
    //   shadowUrl: "path/to/my-icon-shadow.png", // Optional
    //   shadowSize: [40, 40], // Optional
    //   shadowAnchor: [10, 40], // Optional
  }),
  ParkingIcon: L.divIcon({
    className: "parking-icon",
    html: `<div class="tooltip-svg">${parkingSVG}</div>`,
  }),
  RestroomIcon: L.divIcon({
    className: "restroom-icon",
    html: `<div class="tooltip-svg">${restroomSVG}</div>`,
  }),
  PrintingServiceIcon: L.divIcon({
    className: "printing-service-icon",
    html: `<div class="tooltip-svg">${printerSVG}</div>`,
  }),
  LandmarkIcon: L.divIcon({
    className: "landmark-icon",
    html: `<div class="tooltip-svg"></div>`,
  }),
  // Add more icons as needed
};

export default icons;

export type { CustomIcons };
