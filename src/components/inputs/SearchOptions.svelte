<script lang="ts">
  import SearchOption from "$components/buttons/SearchOption.svelte";
  import StarSVG from "$assets/free-icons/star.svg?raw";
  import BuildingSVG from "$assets/free-icons/building.svg?raw";
  import RestroomSVG from "$assets/free-icons/restroom.svg?raw";
</script>

<div class="options">
  <SearchOption name="Gymnasium" value="Gymnasium">
    {@html StarSVG}
  </SearchOption>
  <SearchOption name="AVR" value="Audio Visual Room">
    {@html StarSVG}
  </SearchOption>
  <SearchOption name="LRC Bldg" value="Learning Resource Center">
    {@html BuildingSVG}
  </SearchOption>
  <SearchOption name="Restrooms" value="Restrooms">
    {@html RestroomSVG}
  </SearchOption>
</div>

<style lang="scss">
  .options {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    overflow: auto;
    cursor: grab;
    scrollbar-width: none;
    padding-left: clamp(4px, 5vw, 16px);
    &:active {
      cursor: grabbing;
    }
  }

  @media (max-width: 599px) {
    .options {
      padding-left: clamp(4px, 5vw, 16px);
      padding-right: clamp(4px, 5vw, 16px);
    }
  }
</style>
