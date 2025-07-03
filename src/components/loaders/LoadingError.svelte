<script>
  import LoadingFooter from "./LoadingFooter.svelte";

  let { error } = $props();
</script>

<div class="icon">💔 🥀</div>
<span> Something went wrong! </span>
<span> {error} </span>
<LoadingFooter color={"var(--danger)"} />

<style lang="scss">
  .icon {
    display: flex;
    flex-direction: row;
    gap: 0.8rem;
    font-size: 3em;
  }

  :nth-child(2) {
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--danger);
  }

  :nth-child(3) {
    font-size: small;
    color: var(--danger);
  }
</style>
