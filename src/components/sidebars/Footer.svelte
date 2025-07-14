<script lang="ts">
  import { getMapState } from "$lib/stores/mapState.svelte";
  const mapState = getMapState();
</script>

<footer class="footer">
  <div>
    Not what you were looking for or the data is wrong?<br />Contact us by
    posting an
    <a href="https://github.com/ustp-party/map/issues/new/choose">issue</a>
    or by sending an email to
    <a href="mailto:chrisandrei.irag@1.ustp.edu.ph"
      >chrisandrei.irag@1.ustp.edu.ph</a
    >
  </div>
  <div class="other-links">
    <a
      href="https://github.com/ustp-party/map/blob/master/.github/CONTRIBUTING.md"
      >Contribute</a
    >
    <a href="https://www.ustp.edu.ph/cdeo/ustp-cagayan-de-oro-360-virtual-tour/"
      >Official 360 Virtual Tour</a
    >
    <a href="https://liberapay.com/iragca/donate">Donate</a>
  </div>
  <span class="attribution" aria-label="Map attribution">
    <a href="https://leafletjs.com/">Leaflet</a> | &copy;
    <a href="https://github.com/ustp-party">ustp.party</a>
    | &copy;
    <a href={mapState.tileset.attributionURL}>{mapState.tileset.attribution}</a>
  </span>
</footer>

<style lang="scss">
  a {
    &:hover {
      color: var(--info);
      text-decoration: underline;
    }
  }

  .footer {
    margin-top: auto;
    padding: 10px;
    text-align: center;
    color: var(--text-secondary);
    font-size: small;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .other-links {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 8px;

      a {
        font-weight: 500;
        color: var(--text-secondary);
        text-decoration: none;

        &::before {
          content: "[";
          color: var(--text);
        }
        &::after {
          content: "]";
          color: var(--text);
        }

        &:hover,
        &:active {
          text-decoration: underline;
          color: var(--info);
        }
      }
    }

    .attribution {
      font-size: small;
      color: var(--text-secondary);
      opacity: 0.8;
      a {
        font-weight: 400;
        color: var(--text-secondary);
        text-decoration: none;
        &:hover {
          color: var(--info);
          text-decoration: underline;
        }
      }
    }
  }
</style>
