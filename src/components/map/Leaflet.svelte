<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onDestroy, onMount, setContext } from "svelte";
  import { type Snippet } from "svelte";
  import { currentZoom } from "$lib/stores/map";
  import { currentCenter } from "$lib/stores/map";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import type { FeatureCollection } from "geojson";
  import { mapTheme } from "$lib/theme";

  let mapElement: HTMLDivElement;
  let map: L.Map | undefined = $state();
  let view: L.LatLngExpression = $derived($currentCenter);
  let zoom: number = $derived($currentZoom);
  let searchState = getSearchState();
  let searchResults = $derived<FeatureCollection>({
    type: "FeatureCollection",
    features: searchState.results.slice(0, 5), // Return only top 5
  });
  let buildingsLayer: L.GeoJSON | undefined = $state();

  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  onMount(() => {
    map = L.map(mapElement, { zoomControl: false });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20,
        keepBuffer: 6,
      }
    ).addTo(map);
    map.setView(view, zoom);
  });

  onDestroy(() => {
    if (map) {
      map?.remove();
      map = undefined;
    }
  });

  setContext("map", {
    getMap: () => map,
  });

  // Update the map to highlight search results
  let debounceTimer: ReturnType<typeof setTimeout> | undefined = $state();

  $effect(() => {
    // Cancel previous update
    // Debounce to prevent excessive updates
    clearTimeout(debounceTimer);

    // Set new debounce delay
    debounceTimer = setTimeout(() => {
      if (buildingsLayer) {
        map?.removeLayer(buildingsLayer);
      }

      buildingsLayer = L.geoJSON(searchResults, {
        style: {
          color: mapTheme.highlight,
          weight: 1,
          fillOpacity: 0.5,
        },
      }).addTo(map!);
    }, 700); // only runs if 700ms pass with no new changes
  });
</script>

<div bind:this={mapElement} id="map"></div>
{#if map}
  {@render children()}
{/if}

<style>
  #map {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
