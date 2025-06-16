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
  <SearchOption
    name="LRC Bldg"
    value="Learner's Resource Center (LRC) building"
  >
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
    &:active {
      cursor: grabbing;
    }
  }
</style>
