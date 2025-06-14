<script lang="ts">
  import MaterialIcon from "$components/icons/MaterialIcon.svelte";
</script>

<div class="searchbar-container">
  <div class="searchbar">
    <input type="text" placeholder="Search..." />
    <MaterialIcon name="search" />
  </div>
</div>

<style>
  .searchbar-container {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: left;
    background-color: none;
    z-index: 1000;
    padding-left: clamp(4px, 5vw, 16px);
    padding-right: clamp(4px, 5vw, 16px);
    padding-top: clamp(4px, 2vw, 8px);
    width: 100%;
  }

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

  /* General Mobile Phone resolution */
  @media (max-width: 600px) {
    .searchbar-container {
      align-items: center;
      justify-content: center;
    }
  }

  @media (prefers-color-scheme: dark) {
    .searchbar {
      background-color: var(--bg);
    }
  }
</style>
