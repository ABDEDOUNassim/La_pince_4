<script>
  import logo from "../../../assets/logo/La_pince.png";
  export let currentPage;
  let open = false;
</script>

<header>
  <section class="head">
    <img src={logo} alt="Logo" />
    <button id="sidebar" on:click={() => (open = !open)}>☰</button>
  </section>

  {#if open}
    <nav class="menu">
      <button
        on:click={() => {
          currentPage = "home";
          open = false;
        }}>Home</button
      >
      <button
        on:click={() => {
          currentPage = "login";
          open = false;
        }}>Login</button
      >
      <button
        on:click={() => {
          currentPage = "dashboard";
          open = false;
        }}>Dashboard</button
      >
      <button
        on:click={() => {
          currentPage = "register";
          open = false;
        }}>Register</button
      >
      <button
        on:click={() => {
          currentPage = "category";
          open = false;
        }}>Category</button
      >
    </nav>
  {/if}
</header>

<style>
  @import "../../css/settings.css";
  .head {
    background-color: var(--backgroundHeaderFooter);
    border-bottom: solid 2px var(--bordure);
    box-shadow: 0 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
  }
  img {
    height: 100px;
  }
  #sidebar {
    margin-right: 0.5em;
    padding: 0.5em;
    background-color: var(--backgroundHeaderFooter);
    color: var(--textPrincipal);
    cursor: pointer;
    font-size: 2em;
    border: none;
  }
</style>
