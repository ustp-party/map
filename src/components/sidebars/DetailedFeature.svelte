<script lang="ts">
  import { onMount } from "svelte";
  import type { Position } from "geojson";
  import type { LatLngExpression } from "leaflet";
  import type { Feature, Properties } from "$lib/types/features";

  import exploreIcon from "$assets/material-icons/explore.svg?raw";
  import shareIcon from "$assets/material-icons/share.svg?raw";
  import accessibleSVG from "$assets/free-icons/accessible.svg?raw";
  import stairsSVG from "$assets/free-icons/stairs.svg?raw";
  import elevatorSVG from "$assets/free-icons/elevator.svg?raw";

  import SvgIcon from "$components/icons/SVGIcon.svelte";

  import { geometricCentroid } from "$lib/utils/mapControls";
  import { collapsedSidebar } from "$lib/stores/SidebarStore";
  import { getAppState } from "$lib/stores/appState.svelte";
  import { getMapState } from "$lib/stores/mapState.svelte";

  const appState = getAppState();
  const mapState = getMapState();
  const { feature }: { feature: Feature } = $props();
  let dialog: HTMLDialogElement | undefined = $state(undefined);
  let p = $state<Properties>({
    name: "Loading...",
    description: "Please wait while the feature loads.",
    image:
      "https://res.cloudinary.com/dosy82nwb/image/upload/v1750819151/gym_1_hd_y0kvfr.avif",
    type: "Building",
  });

  if (feature) {
    p = feature.properties;
  }

  function handleClick() {
    let centroid: LatLngExpression;

    if (feature.geometry.type === "Point") {
      let coords = feature.geometry.coordinates as Array<number>;
      let lat = coords[1];
      let lng = coords[0];
      centroid = [lat, lng];
    } else if (feature.geometry.type === "Polygon") {
      centroid = geometricCentroid(
        feature.geometry.coordinates[0] as Position[]
      );
    } else {
      console.warn("Unsupported geometry type:", feature.geometry.type);
      return;
    }

    if (appState.viewportWidth < 600) {
      collapsedSidebar.set(true);
    }

    mapState.map!.setView(centroid, 19, {
      animate: true,
      duration: 0.8,
    });
  }

  // Will be supersed by the <dialog> attribute `closedby="any"` in the future
  // when it is widely supported
  function closeDialog(e: MouseEvent | TouchEvent) {
    if (dialog) {
      const dimensions = dialog.getBoundingClientRect();
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (
        x < dimensions.left ||
        x > dimensions.right ||
        y < dimensions.top ||
        y > dimensions.bottom
      ) {
        dialog!.close();
      }
    }
  }

  onMount(() => {
    if (dialog) {
      dialog.addEventListener("click", closeDialog);
      dialog.addEventListener("touchstart", closeDialog);
    }
  });

  const accessibility: Record<string, string> = {
    Wheelchair: accessibleSVG,
    Elevator: elevatorSVG,
    Stairs: stairsSVG,
  };
</script>

<div class="detailed-feature">
  <abbr title="View picture">
    {#if p.image}
      <button id="close-dialog" onclick={() => dialog!.showModal()}>
        <img src={p.image} alt={p.name} class="header-image" loading="lazy" />
      </button>
    {:else}
      <div class="card-image-placeholder" role="presentation"></div>
    {/if}
  </abbr>
  <div class="content">
    <header>
      <h2>{p.name}</h2>
      <h5>{p.description}</h5>
    </header>
    <main>
      <div class="right-details">
        <p>
          {#if p.long_description}
            {p.long_description}
          {:else}
            <em>No detailed description available.</em>
          {/if}
        </p>
        <dl>
          {@render detail("Building", p["addr:housenumber"])}
          {@render detail("Levels", p["building:levels"])}
          {@render detail("Level", p["level"])}
          {@render detail("Vehicles", p["vehicles"])}
          {@render detail("Capacity", p["Estimated Capacity"])}
        </dl>
      </div>

      <menu class="controls-menu">
        <li>
          <abbr title="Find and zoom to this location on the map">
            <button id="locate-btn" class="menu-item" onclick={handleClick}>
              <div class="icon-container">
                <SvgIcon>{@html exploreIcon}</SvgIcon>
              </div>
              <label for="locate-btn">Find</label></button
            >
          </abbr>
        </li>
        <li>
          <abbr title="Share this location (coming soon)">
            <button id="share-btn" class="menu-item" disabled>
              <div class="icon-container">
                <SvgIcon>{@html shareIcon}</SvgIcon>
              </div>
              <label for="share-btn">Share</label></button
            >
          </abbr>
        </li>
      </menu>
    </main>
    <div class="accessibility-options">
      {#if p.accessibility && p.accessibility.length > 0}
        <h4>Accessibility options</h4>
        <ul>
          {#each p.accessibility as option}
            <li>
              <abbr title="Accessible by {option}">
                <SvgIcon>
                  {@html accessibility[option] || ""}
                </SvgIcon>
              </abbr>
            </li>
          {/each}
        </ul>
      {:else}
        <em>No accessibility options available.</em>
      {/if}
    </div>
  </div>
</div>

<dialog class="focus-image" bind:this={dialog} closedby="any">
  <img src={p.image} alt={p.name} draggable="false" />
</dialog>

{#snippet detail(label: string, value: string | number | undefined)}
  {#if value}
    <dt class="left-detail">{label}</dt>
    <dd class="right-detail">{value}</dd>
  {/if}
{/snippet}

<style lang="scss">
  .detailed-feature {
    #close-dialog {
      all: unset;
      cursor: pointer;
      width: 100%;
      min-height: 200px;
      .header-image {
        width: 100%;
        max-height: max(240px, 24vh);
        object-fit: cover;

        &:hover {
          opacity: 0.8;
        }
      }
    }
    .card-image-placeholder {
      --s: clamp(80px, 10vw + 40px, 400px); /* control the size*/
      --c1: #f0f0f0;
      --c2: #e0e0e0;
      --c3: #d0d0d0;

      width: 100%;
      height: 100%;
      max-height: max(240px, 24vh);
      aspect-ratio: 1;

      background:
        repeating-conic-gradient(from 30deg, #0000 0 120deg, var(--c3) 0 50%)
          calc(var(--s) / 2) calc(var(--s) * tan(30deg) / 2),
        repeating-conic-gradient(
          from 30deg,
          var(--c1) 0 60deg,
          var(--c2) 0 120deg,
          var(--c3) 0 50%
        );
      background-size: var(--s) calc(var(--s) * tan(30deg));

      @media (prefers-color-scheme: dark) {
        --c1: #272736;
        --c2: #333947;
        --c3: #2d2c3b;
      }
    }

    .content {
      & > * {
        padding: 16px 32px;
        border-bottom: 1px solid var(--border);
      }

      header {
        display: flex;
        flex-direction: column;
        gap: 16px;
        h5 {
          font-size: small;
          font-weight: 500;
        }
      }

      main {
        display: flex;
        justify-content: space-between;
        gap: 8px;

        .right-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          p {
            margin: 0;
            font-size: medium;
            line-height: 1.5;
          }
          dl {
            display: grid;
            grid-template-columns: min-content 1fr;
            column-gap: clamp(1rem, 2vw + 4px, 2rem);
            font-size: 0.875rem;
            height: fit-content;

            .left-detail {
              font-weight: 600;
            }
            .right-detail {
              font-weight: 400;
            }
          }
        }
        menu {
          display: flex;
          gap: 16px;

          li {
            all: unset;
          }

          button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;

            .icon-container {
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: var(--bg-accent);
              border-radius: 50%;
              box-shadow: var(--box-shadow);

              @media (prefers-color-scheme: dark) {
                box-shadow: none;
              }
            }

            &:hover,
            &:active {
              background-color: transparent;
            }

            &:hover {
              .icon-container {
                background-color: var(--bg-accent-hover);
              }
            }
          }
        }
      }

      .accessibility-options {
        display: flex;
        flex-direction: column;
        gap: 16px;
        h4 {
          font-size: small;
          font-weight: 600;
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          list-style: none;
          padding: 0;
        }
      }
    }
  }

  .focus-image {
    border: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    overflow: hidden;

    img {
      max-width: max(calc(95vw - 300px), 95vw);
      max-height: 95vh;
      object-fit: cover;
      cursor: zoom-in;
      user-select: none;

      &:active {
        cursor: zoom-out;
        scale: 1.5;
      }
    }

    &::backdrop {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
</style>
