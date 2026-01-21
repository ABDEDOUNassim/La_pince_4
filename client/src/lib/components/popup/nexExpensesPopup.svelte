<main>
  <h1>Nouvelle dépense</h1>

  <section class="formPopupNewExpense">
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
        <label for="text">Catégorie</label>
        <input
          type="text"
          id="text"
          placeholder="Electricité"
          style="background-color:orange"
        />
      </div>

      <div class="formExpense">
        <label for="date">Date</label>
        <input type="text" id="date" placeholder=" JJ/MM/AAAA" />
      </div>

      <button class="btn" type="submit ">Ajouter</button>
    </form>
  </section>
</main>

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
    background-color: var(--BackgroundListe);
    border: 1px solid var(--Bordure);
    color: var(--TextSecondairePlaceholder);
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
    font-family: text, sans-serif;
  }

  /*Labels*/
  .formExpense label {
    font-size: 0.95rem;
    color: var(--TextPrincipal);
    font-family: text, sans-serif;
    padding-left: 0.3em;
  }

  /* Focus */
  .formExpense input:hover {
    border-color: var(--BouttonPrincipal);
  }

  h1 {
    color: var(--TextPrincipal);
    font-family: title, sans-serif;
    text-align: center;
    padding: 2.5em 0 1em 0;
  }

  /* Bouton Ajouter */
  .btn {
    cursor: pointer;
    background-color: var(--BouttonPrincipal);
    border: none;
    padding: 0.8em;
    color: var(--TextSecondairePlaceholder);
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
</style>
