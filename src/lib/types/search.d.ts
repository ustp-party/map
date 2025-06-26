import type { Feature } from "$lib/types/features";
import type { FuseResult } from "fuse.js";

export interface SearchResults extends Feature {}
export interface SearchState {
  query: string;
  results: Feaure[];
  detailedFeature: Feature | undefined;
  updateQuery: (text: string) => void;
  updateDetailedFeature: (feature: Feature | undefined) => void;
  updateResults: (results: FuseResult<SearchResults>[]) => void;
}
