<script>
  import logo from "../../../assets/logo/La_pince.png";
  import HomeSidebar from "../sideBar/homeSidebar.svelte";
  export let currentPage;
  let open = false;
</script>

<header>
  <section class="head">
    <img src={logo} alt="Logo" />

    <section class="deskstop">
      <!-- home -->
      {#if currentPage === "home"}
        <button class="btn" on:click={() => (currentPage = "dashboard")}
          >Tableau de bord</button
        >
        <button class="btn" on:click={() => (currentPage = "register")}
          >Inscription</button
        >
        <button class="btn" on:click={() => (currentPage = "login")}
          >Connexion</button
        >
        <!-- dashboard -->
      {:else if currentPage === "dashboard"}
        <button class="btn" on:click={() => (currentPage = "home")}>Home</button
        >
        <button class="btn" on:click={() => (currentPage = "category")}
          >Catégorie</button
        >
        <button class="btn" on:click={() => (currentPage = "home")}
          >Se déconnecter</button
        >
        <!-- category -->
      {:else if currentPage === "category"}
        <button class="btn" on:click={() => (currentPage = "home")}>Home</button
        >
        <button class="btn" on:click={() => (currentPage = "dashboard")}
          >Tableau de bord</button
        >
        <button class="btn" on:click={() => (currentPage = "home")}
          >Se déconnecter</button
        >
        <!-- login -->
      {:else if currentPage === "login"}
        <button class="btn" on:click={() => (currentPage = "home")}>Home</button
        >
        <!-- register -->
      {:else if currentPage === "register"}
        <button class="btn" on:click={() => (currentPage = "home")}>Home</button
        >
        <button class="btn" on:click={() => (currentPage = "login")}
          >Connexion</button
        >
      {/if}

      <i class=" iconUser fa-solid fa-user-check"></i>
    </section>

    <button id="sidebar" on:click={() => (open = !open)}>☰</button>
  </section>
</header>

<!-- Burger -->
{#if open}
  <HomeSidebar bind:currentPage bind:open />
{/if}

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
<<<<<<< HEAD
    height: 10vh;
=======
>>>>>>> origin/dev
  }
  img {
    height: 100px;
  }
<<<<<<< HEAD
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
=======
  #sidebar {
    margin-right: 0.5em;
    padding: 0.5em;
    background-color: var(--BackgroundHeaderFooter);
    color: var(--TextPrincipal);
>>>>>>> origin/dev
    cursor: pointer;
    font-size: 2em;
    border: none;
  }
<<<<<<< HEAD
  .deskstop {
    margin-right: 2rem;
  }
  .iconUser {
    color: white;
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
=======
>>>>>>> origin/dev
</style>
