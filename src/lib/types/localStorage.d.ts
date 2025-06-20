import type { Feature } from "./features";

export interface LocalStorage {
  recentlyViewed: Feature[];
  firstVisit: boolean;
  insertFeature: (feature: Feature) => void;
}
