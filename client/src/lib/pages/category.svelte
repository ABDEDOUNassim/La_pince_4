<script>
  import NewCategoryPopup from "../components/popup/newCategoryPopup.svelte";
  import EditCategoryPopup from "../components/popup/editCategorie.svelte";
  import { categories as categoriesApi } from "../services/category.service";

  let openEdit = false;
  let editingCategory = null;
  let open = false;
  let currentPage = "category";

  let categories = [];
  let loading = true;
  let error = "";

  function openEditPopup(cat) {
    open = false;
    editingCategory = cat;
    openEdit = true;
  }
  async function handleSaved() {
    openEdit = false;
    editingCategory = null;
    await loadCategories();
  }

  async function loadCategories() {
    try {
      loading = true;
      error = "";
      categories = await categoriesApi.list();
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }
  loadCategories();

  // création category

  async function handleCreated() {
    open = false;
    await loadCategories();
  }

  async function handleDelete(id) {
    try {
      await categoriesApi.remove(id);
      await loadCategories();
    } catch (e) {
      error = e.message;
    }
  }
</script>

{#if open}
  <NewCategoryPopup
    {currentPage}
    onClose={() => (open = false)}
    onCreated={handleCreated}
  />
{/if}
{#if openEdit}
  <EditCategoryPopup
    category={editingCategory}
    onClose={() => {
      openEdit = false;
      editingCategory = null;
    }}
    onSaved={handleSaved}
  />
{/if}

<main>
  <h1>Catégorie</h1>

  <div class="nav">
    <button class="addBtn" on:click={() => (open = true)}>Ajouter</button>
  </div>

  {#if loading}
    <p>Chargement...</p>
  {:else if error}
    <p class="error">{error}</p>
  {:else}
    <section class="categoryDetail">
      {#each categories as c (c.id)}
        <section class="categoryCard">
          <div class="categoryDescription" style="background-color: {c.color}">
            <span class="icon">
              <img src={c.icon} alt="" width="32" height="32" />
            </span>

            <span class="name">
              <p class="nameCategory"><strong>{c.name}</strong></p>
            </span>

            <span class="budget">
              <p class="sum">
                <strong>
                  0,00 € /
                  <span class="total">{Number(c.max_budget).toFixed(2)} €</span>
                </strong>
              </p>
            </span>

            <div class="edit">
              <button
                class="editBtn"
                title="Modifier"
                on:click={() => openEditPopup(c)}
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </button>

              <button
                class="deleteBtn"
                title="Supprimer"
                on:click={() => handleDelete(c.id)}
              >
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </section>
      {/each}
    </section>
  {/if}
</main>

<style>
</style>
