import { getContext, setContext } from "svelte";
import type { LocalStorage } from "$lib/types/localStorage";
import type { Feature } from "$lib/types/features";

class LocalStorageClass implements LocalStorage {
  recentlyViewed: Feature[] = $state([]);
  firstVisit: boolean = $state(false);
  insertFeature(feature: Feature) {
    const MAX_ITEMS = 5;

    // Filter the existing items
    this.recentlyViewed = this.recentlyViewed.filter(
      (f) => f.id !== feature.id
    );
    this.recentlyViewed.push(feature);

    // Trim to last MAX_ITEMS
    this.recentlyViewed = this.recentlyViewed.slice(-MAX_ITEMS);

    // Save back to localStorage
    window.localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(this.recentlyViewed)
    );
  }
}

const DEFAULT_KEY = "$_local_storage";

export const getLocalStorageState = (key = DEFAULT_KEY) => {
  return getContext<LocalStorage>(key);
};

export const setLocalStorageState = (key = DEFAULT_KEY) => {
  const LocalStorage = new LocalStorageClass();
  const recentlyViewedStr = window.localStorage.getItem("recentlyViewed");

  if (!recentlyViewedStr) {
    LocalStorage.firstVisit = true;
  }

  LocalStorage.recentlyViewed = recentlyViewedStr
    ? JSON.parse(recentlyViewedStr)
    : [];
  return setContext(key, LocalStorage);
};
