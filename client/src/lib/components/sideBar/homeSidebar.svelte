<script>
  import { auth } from "../../services/auth.service";

  export let currentPage;
  export let open;
  export let isLoggedIn;

  // Déconnexion
  async function handleLogout() {
    try {
      await auth.logout();
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      isLoggedIn = false;
      currentPage = "home";
      open = false;
    }
  }
</script>

<!-- Overlay -->
<div
  class="overlay"
  on:click={() => (open = false)}
  role="button"
  tabindex="0"
></div>

<aside class="sidebar">
  <button
    class="close"
    on:click={() => (open = false)}
    aria-label="Fermer le menu"
  >
    <i class="fa-solid fa-xmark"></i>
  </button>

  <section class="content">
    <nav class="menu">
      {#if !isLoggedIn}
        <!-- UTILISATEUR NON CONNECTÉ -->
        <button
          class="btnhome"
          on:click={() => {
            currentPage = "login";
            open = false;
          }}
        >
          Connexion
        </button>

        <button
          class="btnhome"
          on:click={() => {
            currentPage = "register";
            open = false;
          }}
        >
          S'inscrire
        </button>
      {:else}
        <!-- UTILISATEUR CONNECTÉ -->
        {#if currentPage !== "dashboard"}
          <button
            class="btnhome"
            on:click={() => {
              currentPage = "dashboard";
              open = false;
            }}
          >
            Tableau de bord
          </button>
        {/if}

        {#if currentPage !== "category"}
          <button
            class="btnhome"
            on:click={() => {
              currentPage = "category";
              open = false;
            }}
          >
            Catégories
          </button>
        {/if}

        <button class="btnhome" on:click={handleLogout}>
          Se déconnecter
        </button>
      {/if}
    </nav>
  </section>
</aside>

<style>
  @import "../../css/settings.css";

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 998;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 85%;
    max-width: 350px;
    height: 100vh;
    background-color: var(--backgroundHeaderFooter);
    z-index: 999;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.5);
    border-left: 2px solid var(--bouttonPrincipal);
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    cursor: pointer;
  }

  .close i {
    color: white;
    font-size: 32px;
  }

  .content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2em;
  }

  .menu {
    width: 100%;
    max-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .btnhome {
    width: 100%;
    padding: 1em;
    font-size: 1.1rem;
    background-color: var(--buttonBackground);
    color: var(--textPrincipal);
    border: 2px solid var(--bordure);
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }

  .btnhome:hover {
    opacity: 0.85;
  }
</style>
