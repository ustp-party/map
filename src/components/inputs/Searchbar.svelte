<script lang="ts">
  import SearchIcon from "$components/icons/SearchIcon.svelte";
</script>

<div class="searchbar">
  <input type="text" placeholder="Search" />
  <SearchIcon />
</div>

<style>
  .searchbar {
    display: flex;
    position: sticky;
    top: 0;
    pointer-events: visibleFill;
    background-color: var(--bg-accent);
    border: 1px solid var(--accent-2);
    border-radius: 25px;
    padding-left: 24px;
    padding-right: 16px;
    align-items: center;
    width: clamp(80px, 100%, 400px);
    height: 48px;
    gap: 8px;
  }

  .searchbar input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    font-size: 1em;
    outline: none;
    color: var(--text);
  }

  .searchbar input::placeholder {
    color: var(--text);
  }

  @media (prefers-color-scheme: dark) {
    .searchbar {
      background-color: var(--bg-accent);
    }
  }
</style>
