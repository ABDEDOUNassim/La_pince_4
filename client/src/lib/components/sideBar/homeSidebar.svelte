<script>
  import { auth } from "../../../api";
  
  export let currentPage;
  export let open;
  export let isLoggedIn; // Recevoir l'état de connexion

  // Fonction de déconnexion
  async function handleLogout() {
    try {
      await auth.logout();
      localStorage.removeItem("token");
      isLoggedIn = false;
      currentPage = "home";
      open = false; // Fermer le menu
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
      localStorage.removeItem("token");
      isLoggedIn = false;
      currentPage = "home";
      open = false;
    }
  }
</script>

<!-- Overlay pour fermer au clic à l'extérieur -->
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
      
      <!-- Si l'utilisateur n'est PAS connecté -->
      {#if !isLoggedIn}
        <button
          class="btnhome"
          on:click={() => {
            currentPage = "home";
            open = false;
          }}>Accueil</button
        >
        <button
          class="btnhome"
          on:click={() => {
            currentPage = "login";
            open = false;
          }}>Connexion</button
        >
        <button
          class="btnhome"
          on:click={() => {
            currentPage = "register";
            open = false;
          }}>S'inscrire</button
        >
      
      <!-- Si l'utilisateur EST connecté -->
      {:else}
        <button
          class="btnhome"
          on:click={() => {
            currentPage = "dashboard";
            open = false;
          }}>Tableau de bord</button
        >
        <button
          class="btnhome"
          on:click={() => {
            currentPage = "category";
            open = false;
          }}>Catégories</button
        >
        <button
          class="btnhome"
          on:click={handleLogout}
        >Se déconnecter</button
        >
      {/if}

    </nav>
  </section>
</aside>

<style>
  @import "../../css/settings.css";
  /* Overlay sombre derrière la sidebar */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 998;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  /* Sidebar qui glisse depuis la droite */
  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 85%;
    max-width: 350px;
    height: 100vh;
    background-color: var(--backgroundHeaderFooter, #1a1a1a);
    z-index: 999;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.3s ease;
    overflow-y: auto;
    border-left: 2px solid var(--bouttonPrincipal);
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
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    background: transparent;
    border: none;
    padding: 0.5em;
    transition: transform 0.2s ease;
  }
  .close i {
    color: #ffffff;
    font-size: 32px;
  }
  /* Contenu de la sidebar */
  .content {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 2em 1em;
  }
  /* Menu de navigation */
  .menu {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    width: 100%;
    max-width: 280px;
  }
  /* Boutons du menu */
  .btnhome {
    width: 100%;
    padding: 1em 1.5em;
    font-size: 1.1rem;
    background-color: var(--buttonBackground, #2a2a2a);
    color: var(--textPrincipal, #ffffff);
    border: 2px solid var(--bordure, #444);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }
</style>
