import { writable } from "svelte/store";
import type { LatLngExpression } from "leaflet";

export let currentZoom = writable<number>(18);
export let defaultZoom = writable<number>(18);
export let currentCenter = writable<LatLngExpression>([8.486001, 124.656645]);
export let defaultCenter = writable<LatLngExpression>([8.486001, 124.656645]);