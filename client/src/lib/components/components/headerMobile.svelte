<script>
  import logo from "../../../assets/logo/La_pince.png";
  export let currentPage;
  let open = false;
</script>

<header>
  <section class="head">
    <img src={logo} alt="Logo" />

    <section class="deskstop">
      {#if currentPage === "home"}
        <button class="btn" on:click={() => (currentPage = "dashboard")}
          >Tableau de bord</button
        >
        <button class="btn" on:click={() => (currentPage = "category")}
          >Catégorie</button
        >
        <button class="btn" on:click={() => (currentPage = "login")}
          >Connexion</button
        >
      {:else if currentPage === "dashboard"}
        <button class="btn" on:click={() => (currentPage = "home")}>Home</button
        >
        <button class="btn" on:click={() => (currentPage = "category")}
          >Catégorie</button
        >
      {:else if currentPage === "category"}
        <button class="btn" on:click={() => (currentPage = "home")}>Home</button
        >
        <button class="btn" on:click={() => (currentPage = "dashboard")}
          >Tableau de bord</button
        >
      {:else if currentPage === "login"}
        <button class="btn" on:click={() => (currentPage = "home")}
          >Retour</button
        >
        <button class="btn" on:click={() => (currentPage = "register")}
          >Inscription</button
        >
      {:else if currentPage === "register"}
        <button class="btn" on:click={() => (currentPage = "home")}
          >Retour</button
        >
        <button class="btn" on:click={() => (currentPage = "login")}
          >Connexion</button
        >
      {/if}

      <i class="fa-solid fa-user-check"></i>
    </section>

    <button id="sidebar" on:click={() => (open = !open)}>☰</button>
  </section>

  <!-- Burger -->

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

<!-- style -->

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
  .deskstop i {
    font-size: 25px;
  }
  .btn {
    margin-right: 1em;
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
  .deskstop {
    margin-right: 2rem;
  }
  @media (min-width: 800px) {
    #sidebar {
      display: none;
    }
  }
  @media (max-width: 800px) {
    .deskstop {
      display: none;
    }
  }
</style>
