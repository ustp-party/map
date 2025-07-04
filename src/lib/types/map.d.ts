import type { Map } from "leaflet";
export interface MapState {
  currentZoom: number;
  updateCurrentZoom: (zoom: number) => void;
  defaultZoom: number;
  currentCenter: LatLngExpression;
  defaultCenter: LatLngExpression;
  buildings: Feature[] | [];
  benches: Feature[] | [];
  parking: Feature[] | [];
  pointsOfInterest: Feature[] | [];
  tileset: string;
  tilesets: Tilesets;
  map: Map | undefined;
  setMap: (map: Map) => void;
  enableBuildings: boolean;
  enableBenches: boolean;
  enableParking: boolean;
  enablePointsOfInterest: boolean;
  enableRestrooms: boolean;
  enablePrintingServices: boolean;
  enableLandmarks: boolean;
  enableEventCenters: boolean;
}

export interface Tilesets {
  voyager: string;
  light: string;
  dark: string;
}
