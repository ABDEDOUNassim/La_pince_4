<main class="sidebarCategory">
  <a class="close" href=""><i class="fa-solid fa-xmark"></i></a>

  <h1>Création catégorie</h1>

  <form class="formNewCategory">
    <div class="formGroup">
      <label for="libelle">Nom</label>
      <input type="text" id="libelle" placeholder="Facture EDF" />
    </div>

    <div class="formGroup">
      <label for="montant">Montant</label>
      <input type="text" id="montant" placeholder="60.00€" />
    </div>

    <div class="formGroup">
      <label>Couleur</label>
      <ul class="formGroupColor">
        <li class="color1"></li>
        <li class="color2"></li>
        <li class="color3"></li>
        <li class="color4"></li>
        <li class="color5"></li>
        <li class="color6"></li>
        <li class="color7"></li>
        <li class="color8"></li>
        <li class="color9"></li>
      </ul>

      <div class="formGroup">
        <label>Icône</label>
        <ul class="formGroupIcon">
          <li><i class="fa-solid fa-cart-plus" style="color: #B197FC;"></i></li>
          <li><i class="fa-solid fa-car" style="color: #63E6BE;"></i></li>
          <li><i class="fa-solid fa-bolt" style="color: #FFD43B;"></i></li>
          <li>
            <i class="fa-solid fa-faucet-drip" style="color: #B197FC;"></i>
          </li>
          <li>
            <i class="fa-solid fa-screwdriver-wrench" style="color: #63E6BE;"
            ></i>
          </li>
          <li><i class="fa-solid fa-hospital" style="color: #FFD43B;"></i></li>
          <li>
            <i class="fa-solid fa-money-bill-trend-up" style="color: #B197FC;"
            ></i>
          </li>
          <li><i class="fa-solid fa-house" style="color: #63E6BE;"></i></li>
          <li><i class="fa-solid fa-gas-pump" style="color: #FFD43B;"></i></li>
        </ul>
      </div>

      <button type="submit" class="btn-ajouter">Ajouter</button>
    </div>
  </form>
</main>

<style>
  @import "../../css/settings.css";
  main {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    position: relative;
    min-height: auto;
    display: flex;
    flex-direction: column;
  }

  /* Croix de fermeture */
  .close {
    position: absolute;
    top: 10px;
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

  .close:hover i {
    color: #e0e0e0;
  }

  /* Titre */
  h1 {
    color: #c8d4e4;
    font-family: title, sans-serif;
    text-align: center;
    padding: 1em 0 0.5em 0;
    font-size: 1.5em;
    margin: 0;
  }

  /* Formulaire */
  .formNewCategory {
    display: flex;
    flex-direction: column;
    gap: 1em;
    flex: 1;
  }

  /* Groupes de champs */
  .formGroup {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  /* Labels */
  .formGroup label {
    font-size: 0.9rem;
    color: #c8d4e4;
    font-family: text, sans-serif;
    padding-left: 0.3em;
  }

  /* Inputs */
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

  /* ====== COULEURS ====== */
  .formGroupColor {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    justify-items: center;
    gap: 6px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .formGroupColor li {
    width: 28px;
    height: 28px;
  }

  /* Couleurs sur chaque bouton */
  .color1 {
    background-color: #ff4d4d;
  }
  .color2 {
    background-color: #ffa64d;
  }
  .color3 {
    background-color: #ffff4d;
  }
  .color4 {
    background-color: #6aff4d;
  }
  .color5 {
    background-color: #4c68f7;
  }
  .color6 {
    background-color: #a64dff;
  }
  .color7 {
    background-color: #ff4da6;
  }
  .color8 {
    background-color: #4dc3ff;
  }
  .color9 {
    background-color: #ff3333;
  }

  .formGroupColor li:hover {
    transform: scale(1.1);
    border-color: #559cd2;
  }

  /* ====== ICÔNES ====== */
  .formGroupIcon {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 6px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .formGroupIcon li {
    width: 100%;
    aspect-ratio: 1;
    background-color: #20232e;
    border: 2px solid #3c4154;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .formGroupIcon li:hover {
    transform: scale(1.05);
    border-color: #559cd2;
  }
  .formGroupIcon i {
    font-size: 30px;
    color: #c8d4e4;
  }
  /* Bouton Ajouter */
  .btn-ajouter {
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
  .btn-ajouter:hover {
    background-color: #1d6fdb;
  }
  .sidebarCategory {
    min-width: 90%;
  }

  @media (max-widht: 700px) {
  }
</style>
