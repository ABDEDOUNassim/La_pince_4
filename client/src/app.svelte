<script>
  import HeaderMobile from "./lib/components/HeaderMobile.svelte";
  import Footer from "./lib/components/Footer.svelte";

  import Home from "./lib/pages/Home.svelte";
  import Login from "./lib/pages/Login.svelte";
  import Dashboard from "./lib/pages/Dashboard.svelte";
  import Category from "./lib/pages/Category.svelte";
  import Register from "./lib/pages/Register.svelte";

  let currentPage = "login";
</script>

<HeaderMobile bind:currentPage />

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
{/if}

<Footer />
