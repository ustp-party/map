import type { FeatureCollection } from "$types/features";
import { base } from "$app/paths";

async function buildings(): Promise<FeatureCollection | null> {
  try {
    const res = await fetch(`${base}/data/ustp-buildings.geojson`);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    return data as FeatureCollection;
  } catch (err) {
    console.error("Failed to load GeoJSON:", err);
    return null;
  }
}

async function benches(): Promise<FeatureCollection | null> {
  try {
    const res = await fetch(`${base}/data/benches.geojson`);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    return data as FeatureCollection;
  } catch (err) {
    console.error("Failed to load GeoJSON:", err);
    return null;
  }
}

async function parking(): Promise<FeatureCollection | null> {
  try {
    const res = await fetch(`${base}/data/parking-spaces.geojson`);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    return data as FeatureCollection;
  } catch (err) {
    console.error("Failed to load GeoJSON:", err);
    return null;
  }
}

async function pointsOfInterest(): Promise<FeatureCollection | null> {
  try {
    const res = await fetch(`${base}/data/points-of-interest.geojson`);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    return data as FeatureCollection;
  } catch (err) {
    console.error("Failed to load GeoJSON:", err);
    return null;
  }
}

const featuresCallbacks = {
  buildings: buildings,
  benches: benches,
  parking: parking,
  pointsOfInterest: pointsOfInterest,
};

export default featuresCallbacks;

export type FeatureType = keyof typeof featuresCallbacks;
