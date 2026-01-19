<script>
  import githubIcon from "../../../assets/icon/github.png";
  import instagramIcon from "../../../assets/icon/instagram.png";
  import twitterIcon from "../../../assets/icon/twitter.png";
  import facebookIcon from "../../../assets/icon/facebook.png";
</script>

<section class="footer">
  <ul>
    <li>
      <a href="https://www.google.com/"></a><img
        src={githubIcon}
        alt="Github"
      />
    </li>
    <li>
      <a href="https://www.google.com/"></a>
      <img src={instagramIcon} alt="Instagram" />
    </li>
    <li>
      <a href="https://www.google.com/"></a>
      <img src={twitterIcon} alt="Twitter - X" />
    </li>
    <li>
      <a href="https://www.google.com/"></a>
      <img src={facebookIcon} alt="FaceBook" />
    </li>
  </ul>
</section>

<style>
  @import "../../css/settings.css";
  .footer {
    background-color: var(--BackgroundHeaderFooter);
    border-top: solid 2px var(--Bordure);
    box-shadow: 0 0 0 0;
    padding: 1em;
  }
  ul {
    display: flex;
    justify-content: flex-end;
    margin-right: 1em;
  }
  img {
    height: 2em;
    margin-right: 1em;
  }
</style>
