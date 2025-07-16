<script lang="ts">
  import L from "leaflet";
  import "leaflet/dist/leaflet.css";
  import { onDestroy, onMount } from "svelte";
  import { goto } from "$app/navigation";

  import type { Properties, Feature as MapFeature } from "$lib/types/features";
  import "leaflet.markercluster";
  import type { Snippet } from "svelte";
  import type { Feature } from "geojson";

  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { mapTheme } from "$lib/theme";
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { getAppState } from "$lib/stores/appState.svelte";
  import controls from "$lib/utils/mapControls";
  import icons from "$components/icons/CustomIcons";
  import { page } from "$app/state";
  import { allFeatures } from "$lib/stores/mapState.svelte";
  import { findCentroid } from "$lib/utils/mapControls";

  let id = page.url.searchParams.get("id") || "";
  let shared = page.url.searchParams.get("shared") || "";
  let appState = getAppState();
  let mapState = getMapState();
  let searchState = getSearchState();
  let mapElement: HTMLDivElement;
  let map: L.Map | undefined = $state();
  let view: L.LatLngExpression = $derived(mapState.currentCenter);
  let zoom: number = $derived(mapState.currentZoom);
  let searchResults = $derived<Feature[]>(searchState.results.slice(0, 10)); // Return only top 5

  let allBuildingsLayer: L.GeoJSON | undefined = undefined;
  let labelsLayer: L.FeatureGroup | undefined = undefined;

  let tilesetLayer: L.TileLayer | undefined = $derived(
    L.tileLayer(mapState.tileset.url, {
      maxZoom: 20,
      keepBuffer: 6,
    })
  );
  let resultsLayer: L.GeoJSON | undefined = undefined;
  let parkingLayer: L.GeoJSON | undefined = undefined;
  let benchesLayer: L.GeoJSON | undefined = undefined;
  let restroomsLayer: L.GeoJSON | undefined = undefined;
  let printingServicesLayer: L.GeoJSON | undefined = undefined;
  let landmarksLayer: L.GeoJSON | undefined = undefined;
  let eventCentersLayer: L.GeoJSON | undefined = undefined;
  let sportsAreasLayer: L.GeoJSON | undefined = undefined;
  let essentialsLayer: L.GeoJSON | undefined = undefined;
  let atmsLayer: L.GeoJSON | undefined = undefined;
  let currentTileset: L.TileLayer | undefined = $state();
  let {
    children,
  }: {
    children: Snippet;
  } = $props();

  const SEARCH_RESULTS_PANE_NAME = "search-results";
  const SEACH_RESULTS_PANE_Z_INDEX = "450";

  onMount(() => {
    map = L.map(mapElement, { zoomControl: false });
    map.attributionControl.setPrefix(false)

    map.createPane(SEARCH_RESULTS_PANE_NAME);
    map.getPane(SEARCH_RESULTS_PANE_NAME)!.style.zIndex =
      SEACH_RESULTS_PANE_Z_INDEX;

    if (map) {
      if (view && zoom) {
        map.setView(view, zoom);
      }
    }
  });

  // If the link is assumed to be shared by a user
  $effect(() => {
    if (id && shared && $allFeatures) {
      const feature = $allFeatures.find((f: Feature) => f.id === id);
      if (feature) {
        const centroid = findCentroid(feature);
        if (centroid && map) {
          map.setView(centroid, 19);
        }
      }
    }
  });

  function setDetailedFeature(feature: MapFeature): void {
    if (feature.id) {
      goto(`?id=${encodeURIComponent(feature.id)}`, { replaceState: true });
    }
    searchState.updateDetailedFeature(feature);
    appState.collapsedSidebar = false;
  }

  // Data viz of all buildings
  $effect(() => {
    // First: Remove existing current tileset
    if (currentTileset) {
      currentTileset.remove();
    }
    currentTileset = tilesetLayer.addTo(map!);

    // Update map reference
    mapState.setMap(map!);

    // Layer configurations
    const layerConfigs = [
      {
        enabled: mapState.enableBuildings,
        existingLayer: () => allBuildingsLayer,
        remove: () => map?.removeLayer(allBuildingsLayer!),
        create: () => {
          allBuildingsLayer = controls
            .setBuildings(mapState.buildings, setDetailedFeature)
            .addTo(map!);
        },
      },
      {
        enabled: mapState.enableLabels,
        existingLayer: () => labelsLayer,
        remove: () => map?.removeLayer(labelsLayer!),
        create: () => {
          labelsLayer = controls
            .setLabels(mapState.buildings, mapState.tileset.theme)
            .addTo(map!);
        },
      },
      {
        enabled: mapState.enableParking,
        existingLayer: () => parkingLayer,
        remove: () => map?.removeLayer(parkingLayer!),
        create: () =>
          (parkingLayer = controls
            .setParkingSpaces(mapState.parking, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enableSportsAreas,
        existingLayer: () => sportsAreasLayer,
        remove: () => map?.removeLayer(sportsAreasLayer!),
        create: () =>
          (sportsAreasLayer = controls
            .setSportsAreas(mapState.sportsAreas, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enableBenches,
        existingLayer: () => benchesLayer,
        remove: () => map?.removeLayer(benchesLayer!),
        create: () =>
          (benchesLayer = controls
            .setBenches(mapState.benches, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enableRestrooms,
        existingLayer: () => restroomsLayer,
        remove: () => map?.removeLayer(restroomsLayer!),
        create: () =>
          (restroomsLayer = controls
            .setRestrooms(mapState.pointsOfInterest, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enablePrintingServices,
        existingLayer: () => printingServicesLayer,
        remove: () => map?.removeLayer(printingServicesLayer!),
        create: () =>
          (printingServicesLayer = controls
            .setPrintingServices(mapState.pointsOfInterest, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enableLandmarks,
        existingLayer: () => landmarksLayer,
        remove: () => map?.removeLayer(landmarksLayer!),
        create: () =>
          (landmarksLayer = controls
            .setLandmarks(mapState.pointsOfInterest, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enableEventCenters,
        existingLayer: () => eventCentersLayer,
        remove: () => map?.removeLayer(eventCentersLayer!),
        create: () =>
          (eventCentersLayer = controls
            .setEventCenters(mapState.pointsOfInterest, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enableEssentials,
        existingLayer: () => essentialsLayer,
        remove: () => map?.removeLayer(essentialsLayer!),
        create: () =>
          (essentialsLayer = controls
            .setEssentials(mapState.pointsOfInterest, setDetailedFeature)
            .addTo(map!)),
      },
      {
        enabled: mapState.enableATMs,
        existingLayer: () => atmsLayer,
        remove: () => map?.removeLayer(atmsLayer!),
        create: () =>
          (atmsLayer = controls
            .setATMs(mapState.pointsOfInterest, setDetailedFeature)
            .addTo(map!)),
      },
    ];

    // Apply all layers based on configuration
    for (const config of layerConfigs) {
      if (config.existingLayer()) {
        config.remove();
      }
      if (config.enabled) {
        config.create();
      }
    }
  });

  // Update map when there are search results
  let debounceTimer: ReturnType<typeof setTimeout> | undefined = undefined;
  $effect(() => {
    if (searchResults) {
      // Clear previous timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Set debounce to update after 700ms of inactivity
      debounceTimer = setTimeout(() => {
        if (resultsLayer) {
          map?.removeLayer(resultsLayer);
        }

        resultsLayer = L.geoJSON(searchResults, {
          style: {
            color: mapTheme.highlight,
            weight: 2,
            fillOpacity: 0.2,
            stroke: true,
          },
          onEachFeature: (feature, layer) => {
            if (feature.geometry.type === "Polygon") {
              const { name, type }: Properties = feature.properties;
              const labels = controls.labelBuilder(feature.properties);
              layer
                .bindTooltip(controls.tooltipTemplate(name, type, labels), {
                  className: "polygon-label",
                })
                .on("click", () => {
                  setDetailedFeature(feature as MapFeature);
                });
            }
          },
          pointToLayer: (feature, latlng) => {
            const { name, type }: Properties = feature.properties;
            const labels = controls.labelBuilder(feature.properties);
            return L.marker(latlng, {
              icon: icons.HighlightIcon,
              pane: SEARCH_RESULTS_PANE_NAME,
            })
              .bindTooltip(controls.tooltipTemplate(name, type, labels), {
                className: "marker-label",
              })
              .on("click", () => {
                setDetailedFeature(feature as MapFeature);
              });
          },
        }).addTo(map!);
      }, 700);
    }
  });

  onDestroy(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    if (currentTileset) {
      currentTileset.remove();
    }
    if (allBuildingsLayer) {
      allBuildingsLayer.remove();
    }
    if (map) {
      map?.remove();
      map = undefined;
    }
  });
</script>

<div
  bind:this={mapElement}
  id="map"
  class={mapState.tileset.theme}
></div>
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
    background-color: white;
  }

  #map.dark {
    background-color: black;
  }
</style>
