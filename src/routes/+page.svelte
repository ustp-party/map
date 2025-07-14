<script lang="ts">
  import type { PageData } from "./$types";
  import type { Feature } from "$lib/types/features";

  import { page } from "$app/state";
  import { onMount } from "svelte";

  import Leaflet from "$components/map/Leaflet.svelte";
  import ZoomControl from "$components/map/ZoomControl.svelte";
  import MapControl from "$components/map/MapControl.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import SearchOptions from "$components/inputs/SearchOptions.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";
  import Drawer from "$components/sidebars/Drawer.svelte";
  import MissingFeature from "$components/dialogs/MissingFeature.svelte";
  import LoadingPage from "$components/loaders/LoadingPage.svelte";
  import LoadingModal from "$components/loaders/LoadingModal.svelte";
  import LoadingError from "$components/loaders/LoadingError.svelte";

  import { getAppState } from "$lib/stores/appState.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { allFeatures } from "$lib/stores/mapState.svelte";
  import featuresCallbacks from "$lib/utils/features";

  const dataPromise = (async () => {
    const buildings = await featuresCallbacks.buildings(fetch);
    const benches = await featuresCallbacks.benches(fetch);
    const parking = await featuresCallbacks.parking(fetch);
    const pointsOfInterest = await featuresCallbacks.pointsOfInterest(fetch);
    const sportsAreas = await featuresCallbacks.sportsAreas(fetch);

    return {
      buildings,
      benches,
      parking,
      pointsOfInterest,
      sportsAreas,
    } satisfies PageData;
  })();
  const mapState = getMapState();
  const appState = getAppState();
  const searchState = getSearchState();
  const id = page.url.searchParams.get("id") || "";
  onMount(() => {
    dataPromise.then((data) => {
      mapState.buildings = data.buildings!.features;
      mapState.benches = data.benches!.features;
      mapState.parking = data.parking!.features;
      mapState.pointsOfInterest = data.pointsOfInterest!.features;
      mapState.sportsAreas = data.sportsAreas!.features;

      let featureArray = data
        .buildings!.features.concat(data.benches!.features)
        .concat(data.parking!.features)
        .concat(data.pointsOfInterest!.features)
        .concat(data.sportsAreas!.features);

      allFeatures.set(featureArray);

      if (id) {
        const feature = featureArray.find((f: Feature) => f.id === id);

        if (feature) {
          searchState.updateDetailedFeature(feature);
          searchState.updateQuery(feature.properties.name);

          switch (feature.properties.type) {
            case "building":
              mapState.enableBuildings = true;
              break;
            case "bench":
              mapState.enableBenches = true;
              break;
            case "parking":
              mapState.enableParking = true;
              break;
            case "Landmark":
              mapState.enableLandmarks = true;
              break;
            case "Restroom":
              mapState.enableRestrooms = true;
              break;
            case "sports":
              mapState.enableSportsAreas = true;
              break;
            case "Printing Service":
              mapState.enablePrintingServices = true;
              break;
            case "Event Center":
              mapState.enableEventCenters = true;
              break;
          }
        } else {
          appState.openMissingFeatureDialog = true;
        }
      }
    });
  });
</script>

{#await dataPromise}
  <LoadingPage>
    <LoadingModal />
  </LoadingPage>
{:then}
  <div class="viewport">
    <Leaflet>
      <Sidebar />
      <div class="top-bar">
        <div class="search">
          <Searchbar />
          <SearchOptions />
          {#if appState.viewportWidth >= 600}
            <MapControl />
          {/if}
        </div>
      </div>
      {#if appState.viewportWidth > 600}
        <ZoomControl />
      {/if}
      <div class="bottom-bar">
        {#if appState.mobileView}
          <MapControl />
        {/if}
      </div>
      {#if appState.mobileView}
        <Drawer />
      {/if}
    </Leaflet>
  </div>
  {#if appState.openMissingFeatureDialog}
    <MissingFeature />
  {/if}
{:catch error}
  <LoadingPage>
    <LoadingError {error} />
  </LoadingPage>
{/await}

<style lang="scss">
  .viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .top-bar {
    position: absolute;
    top: 0;
    display: flex;
    background-color: none;
    z-index: 400;
    padding-top: clamp(4px, 2vw, 8px);
    width: 100%;

    .search {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      row-gap: 8px;
    }
  }

  @media (max-width: 599px) {
    .search {
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .bottom-bar {
    position: absolute;
    bottom: clamp(64px, 10vw, 64px);
    display: flex;
    background-color: none;
    z-index: 1000;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
