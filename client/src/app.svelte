<script>
  import HeaderMobile from "./lib/components/components/headerMobile.svelte";
  import Footer from "./lib/components/components/footer.svelte";
  import Home from "./lib/pages/home.svelte";
  import Login from "./lib/pages/login.svelte";
  import Dashboard from "./lib/pages/dashboard.svelte";
  import Category from "./lib/pages/category.svelte";
  import Register from "./lib/pages/register.svelte";
  import WarningPopup from "./lib/components/popup/warningPopup.svelte";
  import NewExpensesPopup from "./lib/components/popup/nexExpensesPopup.svelte";
  import NewCategoryPopup from "./lib/components/popup/newCategoryPopup.svelte";
  import HomeSidebar from "./lib/components/sideBar/homeSidebar.svelte";
  import MenuSidebar from "./lib/components/sideBar/menuSidebar.svelte";
  import EditCategorie from "./lib/components/popup/editCategorie.svelte";
  import FilterCategorie from "./lib/components/popup/filterCategorie.svelte";
  import EditExpenses from "./lib/components/popup/editExpenses.svelte";

  let currentPage = "home";

  // Variable pour gérer l'état de connexion de l'utilisateur
  let isLoggedIn = false;

  // Au chargement de l'app, vérifier si un token existe dans le localStorage
  // Si oui, l'utilisateur est déjà connecté
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      isLoggedIn = true;
    }
  }

  $: showLayout = ![
    "homeSidebar",
    "menuSidebar",
    "newCategoryPopup",
    "newExpensesPopup",
    "warningPopup",
    "editCategorie",
    "editExpenses",
  ].includes(currentPage);
</script>

{#if showLayout}
  <!-- Passer isLoggedIn au header pour gérer l'affichage des boutons -->
  <HeaderMobile bind:currentPage bind:isLoggedIn />
{/if}

{#if currentPage === "home"}
  <Home />
{:else if currentPage === "login"}
  <!-- Passer isLoggedIn au login pour le mettre à jour après connexion -->
  <Login bind:currentPage bind:isLoggedIn />
{:else if currentPage === "dashboard"}
  <!-- Vérifier si l'utilisateur est connecté avant d'afficher le dashboard -->
  {#if isLoggedIn}
    <Dashboard bind:currentPage />
  {:else}
    <!-- Si pas connecté, rediriger vers login -->
    {(currentPage = "login")}
  {/if}
{:else if currentPage === "register"}
  <Register bind:currentPage bind:isLoggedIn />
{:else if currentPage === "category"}
  <!-- Vérifier si l'utilisateur est connecté avant d'afficher les catégories -->
  {#if isLoggedIn}
    <Category />
  {:else}
    {(currentPage = "login")}
  {/if}
{:else if currentPage === "HomeSidebar"}
  <HomeSidebar />
{:else if currentPage === "warningPopup"}
  <WarningPopup />
{:else if currentPage === "newExpensesPopup"}
  <NewExpensesPopup onClose={() => (currentPage = "dashboard")} />
{:else if currentPage === "newCategoryPopup"}
  <NewCategoryPopup />
{:else if currentPage === "homeSidebar"}
  <HomeSidebar />
{:else if currentPage === "menuSidebar"}
  <MenuSidebar />
{:else if currentPage === "editCategorie"}
  <EditCategorie bind:currentPage />
{:else if currentPage === "filterCategorie"}
  <FilterCategorie bind:currentPage />
{:else if currentPage === "editExpenses"}
  <EditExpenses bind:currentPage />
{/if}

{#if showLayout}
  <Footer />
{/if}
