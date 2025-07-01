<script lang="ts">
  import questionMarkSVG from "$assets/material-icons/question_mark.svg?raw";

  import Leaflet from "$components/map/Leaflet.svelte";
  import ZoomControl from "$components/map/ZoomControl.svelte";
  import MapControl from "$components/map/MapControl.svelte";
  import Searchbar from "$components/inputs/Searchbar.svelte";
  import SearchOptions from "$components/inputs/SearchOptions.svelte";
  import Sidebar from "$components/sidebars/Sidebar.svelte";
  import Drawer from "$components/sidebars/Drawer.svelte";
  import SvgIcon from "$components/icons/SVGIcon.svelte";

  import { allFeatures } from "$lib/stores/mapState.svelte";

  import { type PageData } from "./$types";
  import type { Feature } from "$lib/types/features";
  import { getAppState } from "$lib/stores/appState.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";
  import { getSearchState } from "$lib/stores/SearchState.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/state";

  let { data }: { data: PageData } = $props();
  let id = page.url.searchParams.get("id")?.trim() || "";
  let dialog: HTMLDialogElement | undefined;
  const mapState = getMapState();
  const searchState = getSearchState();
  const appState = getAppState();

  onMount(() => {
    mapState.buildings = data.buildings!.features;
    mapState.benches = data.benches!.features;
    mapState.parking = data.parking!.features;
    mapState.pointsOfInterest = data.pointsOfInterest!.features;
    allFeatures.set([
      ...data.buildings!.features,
      ...data.benches!.features,
      ...data.parking!.features,
      ...data.pointsOfInterest!.features,
    ]);

    if (id && $allFeatures) {
      const feature = $allFeatures.find((f: Feature) => f.id === id);
      console.log(id);
      if (feature) {
        searchState.updateDetailedFeature(feature);
        searchState.updateQuery(feature.properties.name);
      } else {
        dialog?.showModal();
      }
      const path = window.location.pathname;
      history.pushState({}, "", path);
    }
  });
</script>

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
      {#if appState.viewportWidth < 600}
        <MapControl />
      {/if}
    </div>
    {#if appState.viewportWidth < 600}
      <Drawer />
    {/if}
  </Leaflet>
</div>

<dialog
  class="error-message"
  bind:this={dialog}
  closedby="any"
  onclick={() => dialog?.close()}
>
  <SvgIcon size={32} alt="Error" fixed>
    {@html questionMarkSVG}
  </SvgIcon>
  This location does not exist or has been deleted.
  <button>OK</button>
</dialog>

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
    z-index: 1000;
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

  .error-message {
    all: unset;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    color: var(--warning);
    background-color: var(--bg-accent);
    border-radius: 8px;
    padding: 16px;
    box-shadow: var(--box-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }

    @media (prefers-color-scheme: dark) {
      background-color: var(--bg);

      &::backdrop {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }

    button {
      color: var(--warning);
      background-color: var(--warning-bg);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 4px 16px;
      cursor: pointer;
      font-weight: 500;

      &:hover {
        background-color: var(--warning-accent-hover);
      }

      &:active {
        background-color: var(--warning-accent-active);
      }
    }
  }
</style>
