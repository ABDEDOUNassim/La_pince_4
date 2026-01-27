<script>
  import { onMount } from "svelte";
  import DonutChart from "../components/components/donutChart.svelte";
  import NewExpensesPopup from "../components/popup/nexExpensesPopup.svelte";
  import {
    categories as categoriesApi,
    expenses as expensesApi,
  } from "../../api";
  import { auth } from "../services/auth.service";

  let listCategories = [];
  let totalAmount = 0;

  $: labels = listCategories.map((cat) => cat.name);
  $: values = listCategories.map((cat) => Number(cat.max_budget));
  $: colors = listCategories.map((cat) => cat.color);

  let open = false;
  let currentPage = "category";

  async function loadTotal() {
    try {
      const result = await expensesApi.getTotal();

      // On vérifie juste si on a reçu un total valide
      if (result && result.total !== undefined) {
        totalAmount = result.total;
      }
    } catch (err) {
      console.error("Erreur chargement total :", err);
    }
  }

  async function loadCategories() {
    try {
      // On demande à l'API de nous donner la liste
      listCategories = await categoriesApi.list();
      console.log("Mes catégories :", listCategories);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    }
  }

  // Dès que le composant est prêt, on lance le chargement

  onMount(() => {
    loadCategories();
    loadTotal();
    checkMe();
  });

  async function checkMe() {
    try {
      const me = await auth.me();
      console.log("Infos utilisateur connecté :", me);
    } catch (err) {
      console.error("Erreur /auth/me :", err);
    }
  }

  
</script>

{#if open}
  <NewExpensesPopup {currentPage} onClose={() => (open = false)} />
{/if}

<main class="main">
  <!-- Left -->
  <section class="leftBlock">
    <h1>Tableau de bord</h1>

    <section class="expensesTotalLeft">
      <p class="expenseTitle">Dépenses total</p>
      <span class="expense">
        <p><strong>{totalAmount.toFixed(2).replace(".", ",")} €</strong></p>
      </span>
    </section>

    <section class="search">
      <div class="searchBar">
        <button class="searchBtn" aria-label="Paramètres"
          ><i class="fa-solid fa-sliders"></i></button
        >
        <div class="searchBarMiddle">
          <label for="searchBar"></label>
          <input type="text" id="searchBar" placeholder="Rechercher ..." />
        </div>
        <button class="searchBtn" aria-label="Filtrer"
          ><i class="fa-solid fa-filter"></i></button
        >
      </div>
      <div class="addExpense">
        <button
          class="btn"
          on:click={() => (open = !open)}
          aria-label="Ajouter une dépense"
        >
          <i class="fa-solid fa-plus" style="color: #ffffff;"></i>
        </button>
      </div>
    </section>

    <section class="expensesDetailed">
      <p class="date">Mercredi 14 Janvier 2025</p>

      <div class="expensesDescription">
        <span><i class="fa-solid fa-shop" style="color: #63E6BE;"></i></span>
        <span><p class="description">Achat Leroy merlin</p></span>
        <span><p class="montant"><strong>52,12 €</strong></p></span>
      </div>

      <div class="expensesDescription1">
        <span
          ><i class="fa-solid fa-bolt-lightning" style="color: #74C0FC;"
          ></i></span
        >
        <span><p class="description">Facture électricité</p></span>
        <span><p class="montant"><strong>152,12 €</strong></p></span>
      </div>
    </section>
  </section>
  <section class="rightBlock">
    <section class="expensesTotalRight">
      <p class="expenseTitle">Dépenses total</p>
      <span class="expense">
        <p><strong>{totalAmount.toFixed(2).replace(".", ",")} €</strong></p>
      </span>
    </section>

    <section class="diagrame">
      {#if labels.length > 0}
        {#key labels}
          <DonutChart {labels} {values} {colors} />
        {/key}
      {:else}
        <p>Chargement du graphique...</p>
      {/if}
    </section>

    <section class="categoryDetailed">
      {#each listCategories as cat}
        <div class="categoryDescription" style="--bg-color: {cat.color};">
          <p class="nameCategory"><strong>{cat.name}</strong></p>
          <p class="sum">
            <strong
              >0.00 € / <span class="total">{cat.max_budget} €</span></strong
            >
          </p>
        </div>
      {:else}
        <p>Chargement des catégories...</p>
      {/each}
    </section>
  </section>
</main>
