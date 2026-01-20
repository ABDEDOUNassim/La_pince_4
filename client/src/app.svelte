<script>
  import HeaderMobile from "./lib/components/components/headerMobile.svelte";
  import Footer from "./lib/components/components/footer.svelte";

  import Home from "./lib/pages/home.svelte";
  import Login from "./lib/pages/login.svelte";
  import Dashboard from "./lib/pages/dashboard.svelte";
  import Category from "./lib/pages/category.svelte";
  import Register from "./lib/pages/register.svelte";

  let currentPage = "category";

  $: showLayout = ![
    "HomeSidebar",
    "MenuSidebar",
    "newCategoryPopup",
    "NewExpensePopup",
    "WarningPopup",
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
{/if}

{#if showLayout}
  <Footer />
{/if}
