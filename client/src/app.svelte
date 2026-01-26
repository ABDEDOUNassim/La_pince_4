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

  let currentPage = "dashboard";

  $: showLayout = ![
    "homeSidebar",
    "menuSidebar",
    "newCategoryPopup",
    "newExpensesPopup",
    "warningPopup",
    "editCategorie",
  ].includes(currentPage);
</script>

{#if showLayout}
  <HeaderMobile bind:currentPage />
{/if}

{#if currentPage === "home"}
  <Home />
{:else if currentPage === "login"}
  <Login bind:currentPage />
{:else if currentPage === "dashboard"}
  <Dashboard bind:currentPage />
{:else if currentPage === "register"}
  <Register bind:currentPage />
{:else if currentPage === "category"}
  <Category />
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
{/if}

{#if showLayout}
  <Footer />
{/if}
