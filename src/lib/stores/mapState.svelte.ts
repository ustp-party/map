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
  tileset = $state({
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "CARTO",
    attributionURL: "https://carto.com/attributions",
    theme: "dark",
  });
  tilesets = {
    Light: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png",
      attribution: "CARTO",
      attributionURL: "https://carto.com/attributions",
      theme: "light",
    },
    Dark: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "CARTO",
      attributionURL: "https://carto.com/attributions",
      theme: "dark",
    },
    Voyager: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: "CARTO",
      attributionURL: "https://carto.com/attributions",
      theme: "light",
    },
    OpenStreetMap: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "OpenStreetMap",
      attributionURL: "https://www.openstreetmap.org/copyright",
      theme: "light",
    },
    Satellite: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg",
      attribution: "Stadia Maps",
      attributionURL: "https://stadiamaps.com",
      theme: "satellite",
    }
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
  enableLandmarks = $state<boolean>(false);
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
