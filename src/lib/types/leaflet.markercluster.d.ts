import * as L from "leaflet";

declare module "leaflet" {
  namespace MarkerClusterGroupNamespace {
    interface MarkerClusterGroupOptions extends L.LayerOptions {
      maxClusterRadius?: number | ((zoom: number) => number);
      showCoverageOnHover?: boolean;
      iconCreateFunction?: (cluster: L.MarkerCluster) => L.divIcon;
    }
  }

  function markerClusterGroup(
    options?: MarkerClusterGroupNamespace.MarkerClusterGroupOptions
  ): L.MarkerClusterGroup;
}
