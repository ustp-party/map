import type { PageLoad } from "./$types";
import featuresCallbacks from "$lib/utils/features";

export const load = (async () => {
  try {
    const buildings = await featuresCallbacks.buildings();
    const benches = await featuresCallbacks.benches();
    const parking = await featuresCallbacks.parking();
    const pointsOfInterest = await featuresCallbacks.pointsOfInterest();
    return {
      buildings,
      benches,
      parking,
      pointsOfInterest,
    }
  } catch (err) {
    console.error("Failed to load GeoJSON:", err);
    return {
      buildings: null,
    };
  }
}) satisfies PageLoad;
