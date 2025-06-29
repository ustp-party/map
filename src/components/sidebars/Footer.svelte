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
</footer>

<style lang="scss">
  a {
    &:hover {
      color: var(--info);
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

        &:hover {
          text-decoration: underline;
          color: var(--info);
        }
      }
    }
  }
</style>
