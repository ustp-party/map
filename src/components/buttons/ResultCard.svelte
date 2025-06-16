<script lang="ts">
  import type { Feature } from "$lib/types/features";
  import SvgIcon from "$components/icons/SVGIcon.svelte";
  import buildingSVG from "$assets/free-icons/building.svg?raw";
  let { feature }: { feature: Feature } = $props();
  let p = feature.properties;

  const showImages = true;
</script>

<button class="card" id={feature.id}>
  <div class="container">
    <div class="body">
      <div class="icons">
        <SvgIcon>
          {#if p.type == "building"}
            {@html buildingSVG}
          {/if}
        </SvgIcon>
      </div>
      <div class="card-content">
        <h3 class="card-title">{p.name}</h3>
        <div class="details">
          {@render detail("Building", p["addr:housenumber"])}
          {@render detail("Levels", p["building:levels"])}
        </div>
      </div>
    </div>
    {#if p.image && showImages}
      <img src={p.image} alt={p.name} class="card-image" />
    {:else}
      <div class="card-image-placeholder"></div>
    {/if}
  </div>
</button>

{#snippet detail(label: string, value: string | number | undefined)}
  {#if value}
    <div class="left-detail">{label}</div>
    <div class="right-detail">{value}</div>
  {/if}
{/snippet}

<style lang="scss">
  @mixin flex-col {
    display: flex;
    flex-direction: column;
  }
  .card {
    background-color: var(--bg-accent);
    padding: 12px;

    &:hover {
      background-color: var(--bg-accent-hover);
    }

    .container {
      display: flex;
      justify-content: space-between;
      max-width: 100%;
      width: 100%;
      gap: clamp(4px, 4vw, 24px);

      .body {
        display: flex;
        flex-direction: row;
        gap: 4px;

        .card-content {
          @include flex-col;
          max-width: 100%;
          gap: clamp(4px, 1vh + 1px, 8px);

          .card-title {
            font-weight: 600;
            font-size: 1.125rem;
            text-wrap: break-word;
            text-overflow: ellipsis;
          }

          .details {
            display: grid;
            grid-template-columns: min-content 1fr;
            column-gap: clamp(1rem, 2vw + 4px, 2rem);
            font-size: 0.875rem;

            .left-detail {
              font-weight: 600;
            }
            .right-detail {
              font-weight: 400;
            }
          }
        }
      }
    }

    .card-image-placeholder {
      --s: clamp(60px, 5vw + 40px, 100px); /* control the size*/
      --c1: #f0f0f0;
      --c2: #e0e0e0;
      --c3: #d0d0d0;

      min-width: 80px;
      width: clamp(80px, 5vw + 10px, 100px);
      height: 100%;
      aspect-ratio: 1;
      border-radius: 12px;

      background-size: var(--s) calc(var(--s) * tan(30deg));
      background:
        repeating-conic-gradient(from 30deg, #0000 0 120deg, var(--c3) 0 50%)
          calc(var(--s) / 2) calc(var(--s) * tan(30deg) / 2),
        repeating-conic-gradient(
          from 30deg,
          var(--c1) 0 60deg,
          var(--c2) 0 120deg,
          var(--c3) 0 50%
        );

      @media (prefers-color-scheme: dark) {
        --c1: #3c3c4e;
        --c2: #464c5a;
        --c3: #403f4d;
      }
    }
  }
</style>
