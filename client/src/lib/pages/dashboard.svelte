<script>
  import DonutChart from "../components/components/donutChart.svelte";
  import NewExpensesPopup from "../components/popup/nexExpensesPopup.svelte";
  import { auth } from "../../api";

  let labels = ["Courses", "Electricité", "Loisir", "Garagiste"];
  let values = [300, 150, 80, 200];
  let open = false;
  let currentPage = "category";

  import { auth } from "../services/auth.service";

  async function checkMe() {
    try {
      const me = await auth.me();
      console.log("Infos utilisateur connecté :", me);
    } catch (err) {
      console.error("Erreur /auth/me :", err);
    }
  }

  checkMe();
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
        <button class="searchBtn"><i class="fa-solid fa-sliders"></i></button>
        <div class="searchBarMiddle">
          <label for="searchBar"></label>
          <input type="text" id="searchBar" placeholder="Rechercher ..." />
        </div>
        <button class="searchBtn"><i class="fa-solid fa-filter"></i></button>
      </div>
      <div class="addExpense">
        <button class="btn" on:click={() => (open = !open)}
          ><i class="fa-solid fa-plus" style="color: #ffffff;"></i></button
        >
      </div>
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
