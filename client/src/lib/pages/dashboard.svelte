<script>
  import { onMount } from "svelte";
  import DonutChart from "../components/components/donutChart.svelte";
  import EditExpensePopup from "../components/popup/editExpenses.svelte";
  import NewExpensesPopup from "../components/popup/nexExpensesPopup.svelte";
  import {
    auth,
    categories as categoriesApi,
    expenses as expensesApi,
  } from "../../api";

  let loading = true;
  let error = "";
  let expensesList = [];
  let categoriesList = [];
  let categoriesById = new Map();

  // recherche + filtres
  let search = "";
  let showFilters = false;
  let categoryId = "";
  let dateFrom = "";
  let dateTo = "";
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
  let currentPage = "dashboard";

  // si tu ne les utilises pas encore, laisse-les en dur
  let labels = [];
  let values = [];

  let openEdit = false;
  let editingExpense = null;

  function applyFilters() {
    // rien à faire : le filtre est déjà réactif via $:
  }

  // supression d'une dépense
  async function handleDeleteExpense(id) {
    if (!confirm("Supprimer cette dépense ?")) return;
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

    try {
      error = "";
      await expensesApi.remove(id);
      await loadData();
    } catch (e) {
      error = e.message ?? "Erreur lors de la suppression";
    }
  }

  async function loadData() {
    try {
      loading = true;
      error = "";

      const [exp, cats] = await Promise.all([
        expensesApi.list(),
        categoriesApi.list(),
      ]);

      expensesList = (exp ?? []).map((e) => ({
        ...e,
        title: String(e.title ?? ""),
        amount: Number(String(e.amount).replace(",", ".")),
        date: String(e.date ?? "").slice(0, 10), // YYYY-MM-DD
      }));

      categoriesList = cats ?? [];
      categoriesById = new Map(categoriesList.map((c) => [String(c.id), c]));
    } catch (e) {
      error = e.message ?? "Erreur API";
    } finally {
      loading = false;
    }
  }

  loadData();

  function formatDay(yyyyMmDd) {
    const d = new Date(yyyyMmDd);
    return d.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  // ✅ filtrage live (nom ou montant + catégorie + dates)
  $: filteredExpenses = expensesList.filter((e) => {
    const q = search.trim().toLowerCase();

    const matchSearch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      String(e.amount).includes(q.replace(",", "."));

    const matchCategory =
      !categoryId || String(e.category_id) === String(categoryId);

    const matchFrom = !dateFrom || e.date >= dateFrom;
    const matchTo = !dateTo || e.date <= dateTo;

    return matchSearch && matchCategory && matchFrom && matchTo;
  });

  function resetFilters() {
    search = "";
    categoryId = "";
    dateFrom = "";
    dateTo = "";
  }

  // groupement plus limite

  const MAX_ROWS = 5;

  // tri du plus récent au plus ancien (important pour la limite)
  $: sortedExpenses = [...filteredExpenses].sort((a, b) =>
    String(b.date).localeCompare(String(a.date)),
  );

  // on limite à 5 lignes
  $: limitedExpenses = sortedExpenses.slice(0, MAX_ROWS);

  // groupé par date: { "YYYY-MM-DD": [expense, ...] }
  $: groupedByDay = limitedExpenses.reduce((acc, e) => {
    const key = String(e.date).slice(0, 10);
    (acc[key] ||= []).push(e);
    return acc;
  }, {});

  // editExpense

  function openEditExpense(expense) {
    editingExpense = expense;
    openEdit = true;
  }

  async function handleExpenseSaved() {
    openEdit = false;
    editingExpense = null;
    await loadData();
  }
  
</script>

{#if open}
  <NewExpensesPopup {currentPage} onClose={() => (open = false)} />
{/if}

{#if openEdit}
  <EditExpensePopup
    expense={editingExpense}
    onClose={() => {
      openEdit = false;
      editingExpense = null;
    }}
    onSaved={handleExpenseSaved}
  />
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
        <!-- ✅ bouton gauche: toggle filtres -->
        <button
          class="searchBtn"
          on:click={() => (showFilters = !showFilters)}
          aria-expanded={showFilters}
        >
          <i class="fa-solid fa-sliders"></i>
        </button>

        <button class="searchBtn" aria-label="Paramètres"
          ><i class="fa-solid fa-sliders"></i></button
        >
        <div class="searchBarMiddle">
          <label for="searchBar" class="srOnly">Recherche</label>
          <input
            type="text"
            id="searchBar"
            placeholder="Rechercher ..."
            bind:value={search}
            on:keydown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>

        <!-- (tu peux garder ton bouton filter à droite ou le recycler) -->
        <button class="searchBtn" on:click={applyFilters} title="Appliquer">
          <i class="fa-solid fa-filter"></i>
        </button>
        <button class="searchBtn" aria-label="Filtrer"
          ><i class="fa-solid fa-filter"></i></button
        >
      </div>

      <div class="addExpense">
        <button class="btn" on:click={() => (open = !open)}>
        <button
          class="btn"
          on:click={() => (open = !open)}
          aria-label="Ajouter une dépense"
        >
          <i class="fa-solid fa-plus" style="color: #ffffff;"></i>
        </button>
      </div>

      <!-- ✅ panneau qui apparaît sous la barre -->
      {#if showFilters}
        <div class="filtersPanel" on:click|stopPropagation>
          <div class="filtersRow">
            <div class="field">
              <label for="cat">Catégorie</label>
              <select id="cat" bind:value={categoryId}>
                <option value="">Toutes</option>
                {#each categoriesList as c (c.id)}
                  <option value={c.id}>{c.name}</option>
                {/each}
              </select>
            </div>

            <div class="field">
              <label for="from">Du</label>
              <input id="from" type="date" bind:value={dateFrom} />
            </div>

            <div class="field">
              <label for="to">Au</label>
              <input id="to" type="date" bind:value={dateTo} />
            </div>
          </div>

          <div class="filtersActions">
            <button type="button" class="btnSecondary" on:click={resetFilters}
              >Réinitialiser</button
            >
            <button type="button" class="btnPrimary" on:click={applyFilters}
              >Appliquer</button
            >
          </div>
        </div>
      {/if}
      {#if search.trim() || categoryId || dateFrom || dateTo}{/if}
    </section>

    <section class="expensesDetailed">
      {#each Object.entries(groupedByDay) as [day, items]}
        <p class="date">{formatDay(day)}</p>

        {#each items as e (e.id)}
          {@const cat = categoriesById.get(String(e.category_id))}

          <div
            class="resultRow expenseRow"
            style="--cat-color: {cat?.color || '#555'}"
          >
            <div class="resultLeft">
              {#if cat}
                <img
                  class="miniIcon"
                  src={cat.icon}
                  alt=""
                  width="18"
                  height="18"
                />
              {/if}
              <span class="resultTitle">{e.title}</span>
            </div>
            <div class="amountDashboard">
              <span class="resultAmount">{Number(e.amount).toFixed(2)} €</span>
            </div>

            <div class="btnEdit">
              <button
                class="editBtn"
                title="Modifier"
                on:click={() => openEditExpense(e)}
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>

              <button
                class="deleteBtn"
                title="Supprimer"
                on:click={() => handleDeleteExpense(e.id)}
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        {/each}
      {/each}
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

    <!-- -- -->
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
