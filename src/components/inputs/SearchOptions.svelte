<script lang="ts">
  import SearchOption from "$components/buttons/SearchOption.svelte";
  import SearchOptionIcon from "$components/icons/SearchOptionIcon.svelte";
  import StarSVG from "$assets/font-awesome/star.svg?raw";
  import BuildingSVG from "$assets/font-awesome/building.svg?raw";
  import RestroomSVG from "$assets/font-awesome/restroom.svg?raw";
</script>

<div class="options">
  <SearchOption>
    <SearchOptionIcon>
      {@html StarSVG}
    </SearchOptionIcon>
    Gymnasium
  </SearchOption>
  <SearchOption>
    <SearchOptionIcon>
      {@html StarSVG}
    </SearchOptionIcon>
    AVR Room
  </SearchOption>
  <SearchOption>
    <SearchOptionIcon>
      {@html BuildingSVG}
    </SearchOptionIcon>
    LRC Bldg
  </SearchOption>
  <SearchOption>
    <SearchOptionIcon>
      {@html RestroomSVG}
    </SearchOptionIcon>
    Restroom
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

    &:active {
      cursor: grabbing;
    }
  }
</style>
