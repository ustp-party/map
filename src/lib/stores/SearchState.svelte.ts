import { getContext, setContext } from "svelte";
import type { SearchResults, SearchState } from "$lib/types/search";
import type { FuseResult } from "fuse.js";
import type { Feature } from "$lib/types/features";

class SearchStateClass implements SearchState {
  query: string = $state("");
  detailedFeature: Feature | undefined = $state(undefined);
  results: FuseResult<SearchResults>[] = $state([]);
  updateQuery = (text: string) => {
    this.query = text;
  };
  updateDetailedFeature = (feature: Feature | undefined) => {
    this.detailedFeature = feature;
  };
  updateResults = (results: FuseResult<SearchResults>[]) => {
    this.results = results;
  };
}

const DEFAULT_KEY = "$_search_state";

export const getSearchState = (key = DEFAULT_KEY) => {
  return getContext<SearchState>(key);
};

export const setSearchState = (key = DEFAULT_KEY) => {
  const searchState = new SearchStateClass();
  return setContext(key, searchState);
};
