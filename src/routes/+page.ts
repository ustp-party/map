import type { PageLoad } from "./$types";
import featuresCallbacks from "$lib/utils/features";

export const load = (async ({ fetch }) => {
  try {
    const buildings = await featuresCallbacks.buildings(fetch);
    const benches = await featuresCallbacks.benches(fetch);
    const parking = await featuresCallbacks.parking(fetch);
    const pointsOfInterest = await featuresCallbacks.pointsOfInterest(fetch);
    return {
      buildings,
      benches,
      parking,
      pointsOfInterest,
    };
  } catch (err) {
    console.error("Failed to load GeoJSON:", err);
    return {
      buildings: null,
    };
  }
}) satisfies PageLoad;
