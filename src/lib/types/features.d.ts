export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface Feature {
  type: "Feature";
  id: string;
  properties: {
    name: string;
    description: string;
    type?: string;
    "addr:housenumber"?: string;
    "addr:place"?: string;
    "building:levels"?: string;
    level?: string;
    image?: string;
  };
  geometry: Geometry;
}

export interface Geometry {
  type: "Polygon" | "Point";
  coordinates: Polygon[];
}

export type Point = [number, number];
export type Polygon = Point[];