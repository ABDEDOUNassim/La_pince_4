<!-- categorie 22.01.26 13:27 -->

test ^^
test ^^
test ^^

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
    <button class="addBtn" on:click={() => (open = !open)}>Ajouter</button>
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

<!-- save newcategorie avec auth/me -->

<script>
  import { auth, categories } from "../../api.js";

  export let currentPage;
  export let onClose = () => {};
  export let onCreated = () => {};

  let name = "";
  let max_budget = "";
  let color = "";
  let icon = "";

  let loading = false;
  let error = "";

  const colors = [
    "#ff4d4d",
    "#ffa64d",
    "#ffff4d",
    "#6aff4d",
    "#4c68f7",
    "#a64dff",
    "#ff4da6",
    "#4dc3ff",
    "#ff3333",
  ];

  const icons = [
    {
      fa: "fa-cart-plus",
      url: "https://placehold.co/32x32.png",
      color: "#B197FC",
    },
    { fa: "fa-car", url: "https://placehold.co/32x32.png", color: "#63E6BE" },
    { fa: "fa-bolt", url: "https://placehold.co/32x32.png", color: "#FFD43B" },
    {
      fa: "fa-faucet-drip",
      url: "https://placehold.co/32x32.png",
      color: "#B197FC",
    },
    {
      fa: "fa-screwdriver-wrench",
      url: "https://placehold.co/32x32.png",
      color: "#63E6BE",
    },
    {
      fa: "fa-hospital",
      url: "https://placehold.co/32x32.png",
      color: "#FFD43B",
    },
    {
      fa: "fa-money-bill-trend-up",
      url: "https://placehold.co/32x32.png",
      color: "#B197FC",
    },
    { fa: "fa-house", url: "https://placehold.co/32x32.png", color: "#63E6BE" },
    {
      fa: "fa-gas-pump",
      url: "https://placehold.co/32x32.png",
      color: "#FFD43B",
    },
  ];

  function selectColor(hex) {
    color = hex;
  }

  function selectIcon(url) {
    icon = url;
  }

  async function submit() {
    try {
      error = "";

      const trimmed = name.trim();
      if (!trimmed) throw new Error("Le nom est obligatoire.");

      // accepte "60", "60.5", "60,5"
      const budget = Number(
        String(max_budget).replace(",", ".").replace("€", "").trim(),
      );
      if (!Number.isFinite(budget) || budget <= 0) {
        throw new Error("Le montant doit être un nombre > 0 (ex: 60.00).");
      }

      if (!color) throw new Error("Choisis une couleur.");
      if (!icon) throw new Error("Choisis une icône.");

      loading = true;

      // user_id obligatoire sur POST
      const me = await auth.me();

      await categories.create({
        name: trimmed,
        color,
        icon,
        max_budget: budget,
        user_id: 1,
      });

      onCreated();
      onClose();
    } catch (e) {
      error = e.message ?? "Erreur inconnue";
    } finally {
      loading = false;
    }
  }
</script>

<div class="overlay"></div>

<aside class="sidebar">
  <main class="sidebarCategory" on:click|stopPropagation>
    <a class="close" href="/" on:click|preventDefault={onClose}>
      <i class="fa-solid fa-xmark"></i>
    </a>

    <h1>Création catégorie</h1>

    <form class="formNewCategory" on:submit|preventDefault={submit}>
      <div class="formGroup">
        <label for="libelle">Nom</label>
        <input
          type="text"
          id="libelle"
          placeholder="Facture EDF"
          bind:value={name}
        />
      </div>

      <div class="formGroup">
        <label for="montant">Montant</label>
        <input
          type="text"
          id="montant"
          placeholder="60.00"
          bind:value={max_budget}
          inputmode="decimal"
        />
      </div>

      <div class="formGroup">
        <label>Couleur</label>
        <ul class="formGroupColor">
          {#each colors as c}
            <li
              style="background-color:{c}"
              class:selected={color === c}
              on:click={() => selectColor(c)}
              role="button"
              tabindex="0"
            />
          {/each}
        </ul>
      </div>

      <div class="formGroup">
        <label>Icône</label>
        <ul class="formGroupIcon">
          {#each icons as it}
            <li
              class:selected={icon === it.url}
              on:click={() => selectIcon(it.url)}
              role="button"
              tabindex="0"
            >
              <i class={`fa-solid ${it.fa}`} style={`color:${it.color};`}></i>
            </li>
          {/each}
        </ul>
      </div>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" class="btn-ajouter" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter"}
      </button>
    </form>

  </main>
</aside>

<style>
  @import "../../css/settings.css";

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 998;
  }

  .sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: 85%;
    max-width: 350px;
    height: 100vh;
    background-color: var(--backgroundHeaderFooter, #1a1a1a);
    z-index: 999;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.3s ease;
    overflow-y: auto;
    border-left: 2px solid var(--bouttonPrincipal);
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  main.sidebarCategory {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    position: relative;
    min-height: auto;
    display: flex;
    flex-direction: column;
  }

  .close {
    position: absolute;
    top: 20px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    text-decoration: none;
  }

  .close i {
    color: #ffffff;
    font-size: 24px;
  }

  h1 {
    color: #c8d4e4;
    font-family: title, sans-serif;
    text-align: center;
    padding: 1em 0 0.5em 0;
    font-size: 1.5em;
    margin-top: 30px;
  }

  .formNewCategory {
    display: flex;
    flex-direction: column;
    gap: 1em;
    flex: 1;
  }

  .formGroup {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .formGroup label {
    font-size: 0.9rem;
    color: #c8d4e4;
    font-family: text, sans-serif;
    padding-left: 0.3em;
  }

  .formGroup input {
    width: 100%;
    padding: 0.8em;
    background-color: #141720;
    border: 1px solid #3c4154;
    color: #e1e1e1;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
  }

  .formGroup input:hover,
  .formGroup input:focus {
    border-color: #559cd2;
    outline: none;
  }

  .formGroupColor {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    gap: 15px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .formGroupColor li {
    width: 28px;
    height: 28px;
    cursor: pointer;
    border-radius: 6px;
  }

  .formGroupColor li.selected {
    outline: 2px solid #559cd2;
    transform: scale(1.1);
  }

  .formGroupIcon {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .formGroupIcon li {
    width: 100%;
    background-color: #20232e;
    border: 2px solid #3c4154;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 1.5em 0;
  }

  .formGroupIcon li.selected {
    border-color: #559cd2;
  }

  .formGroupIcon i {
    font-size: 30px;
    color: #c8d4e4;
  }

  .btn-ajouter {
    cursor: pointer;
    background-color: #559cd2;
    border: none;
    padding: 0.8em;
    color: #e1e1e1;
    border-radius: 5px;
    font-family: bouton, sans-serif;
    font-weight: bold;
    margin-top: 2em;
    width: 60%;
    align-self: center;
  }

  .btn-ajouter:hover {
    background-color: #1d6fdb;
  }

  .error {
    color: #ff6b6b;
    text-align: center;
    margin-top: 0.25rem;
    font-family: text, sans-serif;
  }

  @media (max-width: 550px) {
    .formGroupIcon {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
