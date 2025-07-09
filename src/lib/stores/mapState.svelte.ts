import { writable } from "svelte/store";
import { getContext, setContext } from "svelte";
import type { Feature } from "$lib/types/features";
import type { MapState, Tilesets } from "$lib/types/map";
import type { Map } from "leaflet";

export let allFeatures = writable<Feature[] | null | undefined>(undefined);

class MapStateClass implements MapState {
  currentZoom = $state(18);
  updateCurrentZoom = (zoom: number) => {
    this.currentZoom = zoom;
  };
  defaultZoom = $state(18);
  currentCenter = $state([8.486001, 124.656645]);
  defaultCenter = $state([8.486001, 124.656645]);
  buildings = $state([]);
  benches = $state([]);
  parking = $state([]);
  pointsOfInterest = $state([]);
  sportsAreas = $state([]);
  tileset = $state(
    "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png"
  );
  tilesets = {
    voyager:
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    light:
      "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
  };
  map = $state<Map | undefined>(undefined);
  setMap = (map: Map) => {
    this.map = map;
  };
  enableBuildings = $state<boolean>(true);
  enableBenches = $state<boolean>(false);
  enableParking = $state<boolean>(true);
  enableSportsAreas = $state<boolean>(false);
  enableRestrooms = $state<boolean>(false);
  enablePrintingServices = $state<boolean>(false);
  enableLandmarks = $state<boolean>(true);
  enableEventCenters = $state<boolean>(true);
  enableLabels = $state<boolean>(true);
  enableEssentials = $state<boolean>(true);
}

const DEFAULT_KEY = "$_map_state";

export const getMapState = (key = DEFAULT_KEY) => {
  return getContext<MapState>(key);
};

export const setMapState = (key = DEFAULT_KEY) => {
  const MapState = new MapStateClass();
  return setContext(key, MapState);
};
