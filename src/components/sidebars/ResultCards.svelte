<script lang="ts">
  import type { Feature } from "$lib/types/features";
  import ResultCard from "$components/buttons/ResultCard.svelte";
  let props = $props<{ features: Feature[] }>();
</script>

<div class="container">
  <div class="cards">
    {#key props.features}
      {#each props.features as feature}
        <ResultCard {feature} />
      {/each}
    {/key}
  </div>
</div>

<style lang="scss">
  .cards {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 12px;
    width: 100%;
    overflow: hidden;
  }
</style>
