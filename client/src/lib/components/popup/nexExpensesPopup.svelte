<script>
  export let currentPage;
  export let onClose = () => {};
</script>

<a class="close" href="/" on:click|preventDefault={onClose}>X</a>

<div
  class="overlay"
  on:click={() => (open = false)}
  role="button"
  tabindex="0"
></div>

<aside class="formPopupNewExpense">
  <main>
    <h1>Nouvelle dépense</h1>

    <a class="close" href=""><i class="fa-solid fa-xmark"></i></a>
    <form class="formExpense">
      <div class="formExpense">
        <label for="libelle"> Libellé </label>
        <input type="text" id="libelle" placeholder="Facture EDF" />
      </div>

      <div class="formExpense">
        <label for="text">Montant</label>
        <input type="text" id="text" placeholder="60.00€" />
      </div>

      <div class="formExpense">
        <label for="date">Date</label>
        <input type="text" id="date" placeholder=" JJ/MM/AAAA" />
      </div>

      <div class="formExpense">
        <label for="text">Catégorie</label>
        <input
          type="text"
          id="text"
          placeholder="Electricité"
          style="background-color:orange"
        />
      </div>

      <button class="btn" type="submit ">Ajouter</button>
    </form>
  </main>
</aside>
s

<style>
  main {
    display: grid;
    width: 90%;
    margin: 0% auto;
    height: 82vh;
  }

  /*Conteneur du formulaire*/
  .formPopupNewExpense {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  /*Groupe de champs*/
  .formExpense {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 5px;
  }

  /* Inputs */
  .formExpense input {
    width: 100%;
    padding: 0.8em;
    background-color: var(--backgroundListe);
    border: 1px solid #3c4154;
    color: #e1e1e1;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
    font-family: text, sans-serif;
  }

  /*Labels*/
  .formExpense label {
    font-size: 0.95rem;
    color: #c8d4e4;
    font-family: text, sans-serif;
    padding-left: 0.3em;
  }

  /* Focus */
  .formExpense input:hover {
    border-color: #559cd2;
  }

  h1 {
    color: #c8d4e4;
    font-family: title, sans-serif;
    text-align: center;
    padding: 2.5em 0 1em 0;
  }

  /* Bouton Ajouter */
  .btn {
    cursor: pointer;
    background-color: #559cd2;
    border: none;
    padding: 0.8em;
    color: #e1e1e1;
    border-radius: 5px;
    font-family: bouton, sans-serif;
    font-weight: bold;
    margin-top: 1em;
    width: 60%;
    align-self: center;
  }
  .btn:hover {
    background-color: #1d6fdb;
  }
  /*croix de fermeture */
  .close {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    text-decoration: none;
  }

  .close i {
    color: #ffffff;
    font-size: 28px; /* Augmente la taille */
  }

  .close:hover i {
    color: #e0e0e0; /* Légèrement gris au survol */
  }

  /* Desktop */
  @media screen and (min-width: 1024px) {
    main {
      max-width: 900px;
      margin: 0 auto;
    }

    h1 {
      font-size: 3rem;
    }
  }

  /* sidebar */
  .formPopupNewExpense {
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

  .close i {
    color: #ffffff;
    font-size: 32px;
  }

  /* Contenu de la sidebar */
  .content {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    padding: 2em 1em;
  }

  /* Menu de navigation */
  .menu {
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    width: 100%;
    max-width: 280px;
  }

  /* Boutons du menu */
  .btnhome {
    width: 100%;
    padding: 1em 1.5em;
    font-size: 1.1rem;
    background-color: var(--buttonBackground, #2a2a2a);
    color: var(--textPrincipal, #ffffff);
    border: 2px solid var(--bordure, #444);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }
</style>
