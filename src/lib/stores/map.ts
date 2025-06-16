import { writable } from "svelte/store";
import type { LatLngExpression } from "leaflet";
import type { FeatureCollection } from "$types/features";
import type { Feature } from "$lib/types/features";

export let currentZoom = writable<number>(18);
export let defaultZoom = writable<number>(18);
export let currentCenter = writable<LatLngExpression>([8.486001, 124.656645]);
export let defaultCenter = writable<LatLngExpression>([8.486001, 124.656645]);

export let buildings = writable<Feature[] | null | undefined>(
  undefined
);
export let benches = writable<FeatureCollection | null | undefined>(undefined);
export let parking = writable<FeatureCollection | null | undefined>(undefined);
export let pointsOfInterest = writable<FeatureCollection | null | undefined>(
  undefined
);
