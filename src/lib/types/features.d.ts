import type { Geometry } from "geojson";
import type { LatLng, LatLngExpression } from "leaflet";

export interface MapGeometry extends Geometry {
  type: "Polygon" | "MultiPolygon" | "Point" | "LineString";
  coordinates: Position[] | Position[][] | Position[][][] | LatLngExpression | Array;
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface Properties {
  name: string;
  description: string;
  type: string | "Restroom" | "Printing Service" | "Landmark" | "Building";
  "addr:housenumber"?: string;
  "addr:place"?: string;
  "building:levels"?: string;
  level?: string;
  image?: string;
  "Estimated Capacity"?: numnber;
  "Has roofing"?: "Yes" | "No";
  "Has backrest"?: "Yes" | "No";
  vehicles?: "All" | "Motorcycles only" | "Cars only" | "Bicycles only";
}

export interface Feature {
  type: "Feature";
  id: string;
  properties: Properties;
  geometry: MapGeometry;
}
