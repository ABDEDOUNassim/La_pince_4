<script>
  import shop from "../../assets/icon/shop.png";
</script>

<main>
  <h1>Tableau de bord</h1>

  <section class="expensesTotal">
    <p>Dépenses total</p>
    <span><p>125.58 €</p></span>
  </section>

  <section class="search">
    <div class="searchBar">
      <i class="fa-solid fa-sliders"></i>
      <i class="fa-solid fa-filter"></i>
      <div class="searchBarMiddle">
        <label for="searchBar"></label>
        <input type="text" id="searchBar" placeholder="Rechercher ..." />

        <button type="submit" aria-label="LancerlaRacherche"
          ><i class="fa-solid fa-magnifying-glass"></i></button
        >
      </div>
    </div>
    <div class="addExpense">
      <button><i class="fa-solid fa-plus"></i></button>
    </div>
  </section>

  <section class="expensesDetailed">
    <p class="date">Mercredi 14 Janvier 2025</p>
    <div class="expensesDescription">
      <span><i><img src={shop} alt="shop" /></i></span>
      <span><p class="description">Achat Leroy merlin</p></span>
      <span><p class="montant">52,12 €</p></span>
    </div>
  </section>
</main>
