import { getContext, setContext } from "svelte";
import type { SearchResults, SearchState } from "$lib/types/search";
import type { FuseResult } from "fuse.js";

class SearchStateClass implements SearchState {
  query: string = $state("");
  results: FuseResult<SearchResults>[] = $state([]);
  updateQuery = (text: string) => {
    this.query = text;
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
