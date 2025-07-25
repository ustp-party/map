import type { Geometry, Position } from "geojson";
import type { LatLng, LatLngExpression } from "leaflet";

export interface MapGeometry extends Geometry {
  type: "Polygon" | "MultiPolygon" | "Point" | "LineString";
  coordinates:
    | Position[]
    | Position[][]
    | Position[][][]
    | LatLngExpression
    | Array;
}

export interface FeatureCollection {
  type: "FeatureCollection";
  features: Feature[];
}

export interface Properties {
  name: string;
  description: string;
  long_description?: string;
  type:
    | string
    | "Restroom"
    | "Printing Service"
    | "Landmark"
    | "Building"
    | "Event Center";
  "addr:housenumber"?: string;
  "addr:place"?: string;
  "building:levels"?: string;
  level?: string;
  image?: string;
  image_compressed?: string;
  "Estimated Capacity"?: numnber;
  "Has roofing"?: "Yes" | "No";
  "Has backrest"?: "Yes" | "No";
  "Has table"?: "Yes" | "No";
  vehicles?: "All" | "Motorcycles only" | "Cars only" | "Bicycles only";
  accessibility?: Array<"Wheelchair" | "Elevator" | "Stairs" | "None">;
  Outdoor?: "Yes" | "No";
  Lit?: "Yes" | "No";
  Sport?: string;
  Fee?: "Yes" | "No";
  Surface?: "Dirt" | "Concrete" | "Asphalt" | "Synthetic" | "Other";
  last_updated?: string;
  iconParams?: {
    iconUrl: string;
    iconSize: [number, number];
    iconAnchor: [number, number];
    popupAnchor: [number, number];
  };
  custom_properties?: {
    [key: string]: string | number | boolean | null; // Custom properties can be of various types
  };
}

export interface Feature {
  type: "Feature";
  id: string;
  properties: Properties;
  geometry: MapGeometry;
}
