import "geojson";

declare module "geojson" {
  interface Polygon extends Geometry {
    centroid?: Position;
  }
}
