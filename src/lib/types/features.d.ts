import type { Geometry } from "geojson";

export interface MapGeometry extends Geometry {
  type: "Polygon" | "MultiPolygon" | "Point" | "LineString";
  coordinates: Position[] | Position[][] | Position[][][];
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface Properties {
  name: string;
  description: string;
  type?: string | "Restroom";
  "addr:housenumber"?: string;
  "addr:place"?: string;
  "building:levels"?: string;
  level?: string;
  image?: string;
  "Estimated Capacity"?: numnber;
  "Has roofing"?: "Yes" | "No";
  "Has backrest"?: "Yes" | "No";
}

export interface Feature {
  type: "Feature";
  id: string;
  properties: Properties;
  geometry: MapGeometry;
}
