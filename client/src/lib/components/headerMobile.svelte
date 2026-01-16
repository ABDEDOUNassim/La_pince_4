<script>
  import logo from "../../assets/logo/la_pince.png";
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
