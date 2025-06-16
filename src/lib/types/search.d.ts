import type { Feature } from "$lib/types/features";
import type { FuseResult } from "fuse.js";

export interface SearchResults extends Feature {}
export interface SearchState {
  query: string;
  results: Feaure[];
  updateQuery: (text: string) => void;
  updateResults: (results: FuseResult<SearchResults>[]) => void;
}
