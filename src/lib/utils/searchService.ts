import Fuse from "fuse.js";
import type { Feature } from "$lib/types/features";

const fuseOptions = {
  keys: [
    { name: ["properties", "name"], weight: 0.5 },
    { name: ["properties", "type"], weight: 0.2 },
    { name: "properties.addr:housenumber", weight: 3 },
  ],
  //   threshold: 0.0,
  //   includeScore: true,
  findAllMatches: true,
  shouldSort: true,
};

export function createSearchIndex(books: Feature[]) {
  return new Fuse(books, fuseOptions);
}

export function searchBooks(fuse: Fuse<any>, query: string) {
  if (!query.trim()) {
    return [];
  }
  return fuse.search(query);
}
