<script lang="ts">
  import MaterialIcon from "$components/icons/MaterialIcon.svelte";
</script>

<div class="searchbar">
  <input type="text" placeholder="Search..." />
  <MaterialIcon name="search" />
</div>

<style>
  .searchbar {
    display: flex;
    position: sticky;
    top: 0;
    pointer-events: visibleFill;
    background-color: var(--bg);
    border-radius: 25px;
    padding-left: 24px;
    padding-right: 16px;
    align-items: center;
    width: clamp(80px, 100%, 400px);
    height: 48px;
    gap: 8px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
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
      background-color: var(--bg);
    }
  }
</style>
