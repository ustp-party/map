import { getContext, setContext } from "svelte";
import type { FeatureCollection } from "$lib/types/features";
import type { Feature } from "$lib/types/features";

export interface SearchResults extends Feature {
  searchTerms: string;
}
export interface SearchbarInputState {
  value: string;
  update: (text: string) => void;
  data: SearchResults[];
  populateData: (data: FeatureCollection) => void;
}

class SearchbarInputStateClass implements SearchbarInputState {
  value = $state("");
  update = (text: string) => {
    this.value = text;
  };
  data = <SearchResults[]>([]);
  populateData = (input_data: FeatureCollection) => {
    try {
      this.data = input_data.features.map((feature: Feature) => {
        const { name, description, type, level } = feature.properties;
        const buildingLevels = feature.properties["building:levels"];

        return {
          ...feature,
          searchTerms: [name, description, type, level, buildingLevels]
            .filter(Boolean)
            .join(" "),
        };
      });
    } catch (error) {
      console.error("Error populating search results data:", error);
    }
  };
}

const DEFAULT_KEY = "$_text_input_state";

export const getSearchbarInputState = (key = DEFAULT_KEY) => {
  return getContext<SearchbarInputState>(key);
};

export const setSearchbarInputState = (key = DEFAULT_KEY) => {
  const searchbarState = new SearchbarInputStateClass();
  return setContext(key, searchbarState);
};
