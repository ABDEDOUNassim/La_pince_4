<script>
  import logo from "../../../assets/logo/La_pince.png";
  import HomeSidebar from "../../components/sideBar/homeSidebar.svelte";
  import { auth } from "../../services/auth.service";
  import { onMount } from "svelte";

  export let currentPage;
  export let isLoggedIn; // Recevoir l'état de connexion

  let open = false;
  let userName = "";

  // Fonction  our affichage du nom du user quand il est connecté
  async function loadUserName() {
    if (!isLoggedIn) return;

    try {
      const me = await auth.me();
      userName = me.name || me.user?.name || "Utilisateur";
    } catch (err) {
      console.error("Erreur récupération nom:", err);
    }
  }

  onMount(() => {
    loadUserName();
  });

  $: if (isLoggedIn) {
    loadUserName();
  } else {
    userName = "";
  }

  // Fonction de déconnexion
  async function handleLogout() {
    try {
      // Appel à l'API backend pour déconnecter
      await auth.logout();

      // Supprimer le token du localStorage
      localStorage.removeItem("token");

      // Mettre à jour l'état de connexion
      isLoggedIn = false;

      // Rediriger vers la page d'accueil
      currentPage = "home";
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      // Même en cas d'erreur API, on déconnecte côté client
      localStorage.removeItem("token");
      isLoggedIn = false;
      currentPage = "home";
    }
  }
</script>

<header>
  <section class="head">
    <button
      style="background: none; border: none; padding: 0; cursor: pointer;"
      on:click={() => (currentPage = "home")}
    >
      <img src={logo} alt="Logo" />
    </button>

    <!--affichage du nom du user quand il est connecté -->

    {#if isLoggedIn && userName}
      <p class="textwelcome">Bienvenue {userName}</p>
    {/if}

    <section class="deskstop">
      <!-- Si l'utilisateur n'est PAS connecté (page home, login, register) -->
      {#if !isLoggedIn}
        <button class="btn" on:click={() => (currentPage = "register")}>
          Inscription
        </button>
        <button class="btn" on:click={() => (currentPage = "login")}>
          Connexion
        </button>

        <!-- Si l'utilisateur EST connecté (dashboard, category) -->
      {:else}
        <!-- Afficher "Tableau de bord" seulement si on n'est pas déjà dessus -->
        {#if currentPage !== "dashboard"}
          <button class="btn" on:click={() => (currentPage = "dashboard")}>
            Tableau de bord
          </button>
        {/if}

        <!-- Afficher "Catégorie" seulement si on n'est pas déjà dessus -->
        {#if currentPage !== "category"}
          <button class="btn" on:click={() => (currentPage = "category")}>
            Catégorie
          </button>
        {/if}

        <!-- Bouton de déconnexion -->
        <button class="btn" on:click={handleLogout}> Se déconnecter </button>

        <i class="iconUser fa-solid fa-user-check"></i>
      {/if}
    </section>
    <button id="sidebar" on:click={() => (open = !open)}>☰</button>
  </section>
</header>

<!-- Burger -->
{#if open}
  <HomeSidebar bind:currentPage bind:open bind:isLoggedIn />
{/if}

<!-- style -->
<style>
  @import "../../css/settings.css";
  .head {
    background-color: var(--backgroundHeaderFooter);
    border-bottom: solid 2px var(--bouttonPrincipal);
    box-shadow: 1px 2px 11px var(--bouttonPrincipal);
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
</style>
