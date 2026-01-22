<script>
  import NewCategoryPopup from "../components/popup/newCategoryPopup.svelte";
  let open = false;
  let currentPage = "category";
</script>

{#if open}
  <NewCategoryPopup {currentPage} onClose={() => (open = false)} />
{/if}

<main>
  <h1>Catégorie</h1>

  <div class="nav">
    <button class="filterBtn">Filtre</button>
    <button id="sidebar" on:click={() => (open = !open)}></button>
  </div>

  <!-- Category -->
  <!-- Category left -->

  <section class="categoryDetail">
    <section class="left">
      <div class="categoryDescription">
        <span><i class="fa-solid fa-shop" style="color: #63E6BE;"></i></span>
        <span><p class="nameCategory"><strong>Courses</strong></p></span>
        <span
          ><p class="sum">
            <strong>52,12 € / <span class="total">300,00 €</span></strong>
          </p></span
        >
        <div class="edit">
          <button class="editBtn"
            ><i class="fa-solid fa-pen-to-square"></i></button
          >
          <button class="deleteBtn"
            ><i class="fa-solid fa-trash-can"></i></button
          >
        </div>
      </div>
    </section>

    <!-- Category right -->
    <section class="right">
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
        <div class="edit">
          <button class="editBtn"
            ><i class="fa-solid fa-pen-to-square"></i></button
          >
          <button class="deleteBtn"
            ><i class="fa-solid fa-trash-can"></i></button
          >
        </div>
      </div>
    </section>
  </section>
</main>

<style>
</style>
