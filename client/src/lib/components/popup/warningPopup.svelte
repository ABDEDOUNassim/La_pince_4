<script>
  import DangerIcon from "../../../assets/icon/attentionSmall.png";
</script>

<div class="popupContainer">
  <a class="close" href=""><i class="fa-solid fa-xmark"></i></a>
  <div class="popup">
    <img src={DangerIcon} alt="Pop-up d'alerte de budget" />
    <p class="texte">Budget maximum bientôt atteint</p>
  </div>
</div>

<style>
  .popupContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    max-width: 500px;
    background-color: var(--BackgroudCarte);
    padding: 16px;
    border-radius: 12px;
    z-index: 1000;
  }

  .popupContainer:hover {
    border-color: var(--BouttonPrincipal);
  }
  .close {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
    z-index: 10;
  }

  .close i {
    color: #f4f5f6;
    font-size: 18px;
    margin: 1em 1em 0 0;
  }

  .popup {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2em 5em;
    border-radius: 12px;
    background-color: var(--BackgroudCarte);
    box-shadow: 0 6px 18px rgba(255, 0, 0, 0.25);
  }

  /* Icône danger */
  .popup img {
    width: 36px;
    height: 36px;
    object-fit: contain;
  }

  .content {
    flex: 1;
  }

  .texte {
    font-weight: 600;
    font-size: 0.95rem;
    color: #c62828;
    font-family: text, sans-serif;
    margin: 0;
  }
</style>
