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
  sportsAreas: Feature[] | [];
  tileset: TilesetConfig;
  tilesets: Tilesets;
  map: Map | undefined;
  setMap: (map: Map) => void;
  enableBuildings: boolean;
  enableBenches: boolean;
  enableParking: boolean;
  enableRestrooms: boolean;
  enablePrintingServices: boolean;
  enableLandmarks: boolean;
  enableEventCenters: boolean;
  enableSportsAreas: boolean;
  enableLabels: boolean;
  enableEssentials: boolean;
  enableATMs: boolean;
}

type TilesetConfig = {
  url: string;
  attribution?: string;
  attributionURL?: string;
  theme:  "light" | "dark" | "satellite" | string;
};

export interface Tilesets {
  Voyager: TilesetConfig;
  Light: TilesetConfig;
  Dark: TilesetConfig;
  OpenStreetMap: TilesetConfig;
  Satellite: TilesetConfig;
}
