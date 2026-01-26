<script>
  import DonutChart from "../components/components/donutChart.svelte";
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

  let open = false;
  let currentPage = "dashboard";

  // si tu ne les utilises pas encore, laisse-les en dur
  let labels = [];
  let values = [];

  function applyFilters() {
    // rien à faire : le filtre est déjà réactif via $:
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
      <span class="expense"><p><strong>1125,58 €</strong></p></span>
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
      </div>

      <div class="addExpense">
        <button class="btn" on:click={() => (open = !open)}>
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
      {#if search.trim() || categoryId || dateFrom || dateTo}
        <section class="searchResults">
          {#if filteredExpenses.length === 0}
            <p class="empty">Aucun résultat.</p>
          {:else}
            {#each filteredExpenses as e (e.id)}
              {@const cat = categoriesById.get(String(e.category_id))}
              <div class="resultRow">
                <div class="resultLeft">
                  {#if cat}
                    <span class="dot" style="background:{cat.color}"></span>
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
                <span class="resultAmount">{Number(e.amount).toFixed(2)} €</span
                >
              </div>
            {/each}
          {/if}
        </section>
      {/if}
    </section>

    <!-- Expenses -->

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
        <span><p class="description">Facture élctricité</p></span>
        <span><p class="montant"><strong>152,12 €</strong></p></span>
      </div>
    </section>
  </section>

  <!-- Right -->

  <section class="rightBlock">
    <section class="expensesTotalRight">
      <p class="expenseTitle">Dépenses total</p>
      <span class="expense"><p><strong>1125,58 €</strong></p></span>
    </section>

    <!-- Diagrame -->

    <section class="diagrame">
      <DonutChart {labels} {values} />
    </section>

    <!-- -- -->

    <section class="categoryDetailed">
      <div class="categoryDescription">
        <span><i class="fa-solid fa-shop" style="color: #63E6BE;"></i></span>
        <span><p class="nameCategory"><strong>Courses</strong></p></span>
        <span
          ><p class="sum">
            <strong>52,12 € / <span class="total">300,00 €</span></strong>
          </p></span
        >
      </div>

      <div class="categoryDescription1">
        <span
          ><i class="fa-solid fa-bolt-lightning" style="color: #74C0FC;"
          ></i></span
        >
        <span><p class="nameCategory1"><strong>Electricité</strong></p></span>
        <span
          ><p class="sum1">
            <strong>152,12 € / <span class="total1">300,00 €</span></strong>
          </p></span
        >
      </div>
    </section>
  </section>
</main>
