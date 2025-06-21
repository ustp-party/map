import type { Map } from "leaflet";
export interface MapState {
  currentZoom: number;
  defaultZoom: number;
  currentCenter: LatLngExpression;
  defaultCenter: LatLngExpression;
  buildings: Feature[] | [];
  benches: Feature[] | [];
  parking: Feature[] | [];
  pointsOfInterest: Feature[] | [];
  tileset: string;
  map: Map | undefined;
  setMap: (map: Map) => void;
  enableBuildings: boolean;
  enableBenches: boolean;
  enableParking: boolean;
  enablePointsOfInterest: boolean;
  enableRestrooms: boolean;
}
