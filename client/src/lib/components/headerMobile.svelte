<script>
  import logo from "../../assets/logo/la_pince.png";
</script>

<header>
  <section class="head">
    <img src={logo} alt="Logo" />
    <button id="sidebar">burger</button>
  </section>
</header>

<style>
  @import "../css/settings.css";
  .head {
    background-color: var(--BackgroundHeaderFooter);
    border-bottom: solid 2px var(--Bordure);
    box-shadow: 0 0 0 0;
    display: flex;
  }
  img {
    height: 100px;
  }
</style>
