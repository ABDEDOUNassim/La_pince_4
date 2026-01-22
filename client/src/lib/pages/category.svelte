<script>
  import NewCategoryPopup from "../components/popup/newCategoryPopup.svelte";
  import { categories as categoriesApi } from "../../api";

  let open = false;
  let currentPage = "category";

  let categories = [];
  let loading = true;
  let error = "";

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

<main>
  <h1>Catégorie</h1>

  <div class="nav">
    <button class="filterBtn">Filtre</button>
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
          <div
            class="categoryDescription"
            style="border-left: 6px solid {c.color}"
          >
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
              <button class="editBtn" title="Modifier">
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
  .error {
    color: #ff6b6b;
    margin-top: 1rem;
  }

  .categoryDetail {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
  }

  .categoryDescription {
    display: grid;
    grid-template-columns: 48px 1fr auto auto;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-radius: 10px;
    background: #20232e;
  }

  .edit {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .editBtn,
  .deleteBtn {
    cursor: pointer;
    background: transparent;
    border: none;
    color: #c8d4e4;
    font-size: 18px;
  }

  .deleteBtn:hover {
    color: #ff6b6b;
  }

  .editBtn:hover {
    color: #74c0fc;
  }
</style>
