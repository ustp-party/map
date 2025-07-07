import type { FeatureCollection } from "$types/features";
import { base } from "$app/paths";

async function buildings(
  svelteFetch: Function
): Promise<FeatureCollection | null> {
  try {
    const res = await svelteFetch(`${base}/data/ustp-buildings.geojson`);
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

async function benches(
  svelteFetch: Function
): Promise<FeatureCollection | null> {
  try {
    const res = await svelteFetch(`${base}/data/benches.geojson`);
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

async function parking(
  svelteFetch: Function
): Promise<FeatureCollection | null> {
  try {
    const res = await svelteFetch(`${base}/data/parking-spaces.geojson`);
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

async function pointsOfInterest(
  svelteFetch: Function
): Promise<FeatureCollection | null> {
  try {
    const res = await svelteFetch(`${base}/data/points-of-interest.geojson`);
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

async function sportsAreas(
  svelteFetch: Function
): Promise<FeatureCollection | null> {
  try {
    const res = await svelteFetch(`${base}/data/sports-areas.geojson`);
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
  sportsAreas: sportsAreas
};

export default featuresCallbacks;

export type FeatureType = keyof typeof featuresCallbacks;
