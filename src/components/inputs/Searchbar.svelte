<script lang="ts">
  import SearchIcon from "$components/icons/SearchIcon.svelte";
</script>

<div class="searchbar">
  <input type="text" placeholder="Search" />
  <SearchIcon />
</div>

<style lang="scss">
  .searchbar {
    display: flex;
    position: sticky;
    top: 0;
    pointer-events: visibleFill;
    background-color: var(--bg-accent);
    border: 1px solid var(--border);
    border-radius: 25px;
    padding: 8px 16px;
    align-items: center;
    width: clamp(80px, 100%, 400px);
    height: 48px;
    gap: 8px;

    input {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;
      font-size: 1em;
      font-weight: 500;
      outline: none;
      color: var(--text);

      &::placeholder {
        color: var(--text);
      }
    }
  }
  @media (prefers-color-scheme: dark) {
    .searchbar {
      background-color: var(--bg-accent);
    }
  }
</style>
