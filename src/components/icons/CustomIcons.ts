import L from "leaflet";
import "$styles/icons.scss";

import ripples from "$assets/animated/ripples.svg?raw";
import restroomSVG from "$assets/free-icons/restroom.svg?raw";
import parkingSVG from "$assets/free-icons/parking.svg?raw";
import printerSVG from "$assets/free-icons/printer.svg?raw";
import monumentSVG from "$assets/free-icons/monument.svg?raw"

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
    iconAnchor: [32, 32], // point of the icon which corresponds to the marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
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
    // iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  }),
  PrintingServiceIcon: L.divIcon({
    className: "printing-service-icon",
    html: `<div class="tooltip-svg">${printerSVG}</div>`,
    // iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  }),
  LandmarkIcon: L.divIcon({
    className: "landmark-icon",
    html: `<div class="tooltip-svg">${monumentSVG}</div>`,
    // iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0],
  }),
  HighlightIcon: L.divIcon({
    className: "highlight-icon",
    html: ripples,
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [0, 0],
  }),
  EventCenterIcon: L.divIcon({
    className: "event-center-icon",
    html: `<div class="tooltip-svg"></div>`,
    // iconSize: [24, 24],
    iconAnchor: [9, 9],
    popupAnchor: [0, 0],
  }),
};

export default icons;

export type { CustomIcons };
