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

  let currentPage = "category";

  $: showLayout = ![
    "homeSidebar",
    "menuSidebar",
    "newCategoryPopup",
    "newExpensesPopup",
    "warningPopup",
  ].includes(currentPage);
</script>

{#if showLayout}
  <HeaderMobile bind:currentPage />
{/if}

{#if currentPage === "home"}
  <Home />
{:else if currentPage === "login"}
  <Login />
{:else if currentPage === "dashboard"}
  <Dashboard />
{:else if currentPage === "register"}
  <Register />
{:else if currentPage === "category"}
  <Category />
{:else if currentPage === "HomeSidebar"}
  <HomeSidebar />
{:else if currentPage === "warningPopup"}
  <WarningPopup />
{:else if currentPage === "newExpensesPopup"}
  <NewExpensesPopup />
{:else if currentPage === "newCategoryPopup"}
  <NewCategoryPopup />
{:else if currentPage === "homeSidebar"}
  <HomeSidebar />
{:else if currentPage === "menuSidebar"}
  <MenuSidebar />
{/if}

{#if showLayout}
  <Footer />
{/if}
