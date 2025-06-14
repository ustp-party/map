import { writable } from "svelte/store";
import type { LatLngExpression } from "leaflet";

export let currentZoom = writable<number>(18);
export let currentCenter = writable<LatLngExpression>([8.486001, 124.656645]);
