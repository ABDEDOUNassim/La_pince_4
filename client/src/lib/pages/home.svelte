<script>
  import student from "../../assets/logo/etudiant.png";
  import family from "../../assets/logo/famille.png";
  import independant from "../../assets/logo/independant.png";
</script>

<main>
  <h1 class="headline">Reprenez le contrôle de votre budget !</h1>

  <section class="targets">
    <div class="target">
      <img src={student} alt="Etudiant" />
    </div>

    <div class="target">
      <img src={family} alt="Avatar d'une famille" />
    </div>

    <div class="target">
      <img src={independant} alt="Avatar d'un independant" />
    </div>
  </section>

  <section class="services">
    <div class="serviceDesc">
      <h2>Suivez vos dépenses</h2>
      <p class="serviceCard">Visualisez vos dépenses en un seul coup d'oeil.</p>
    </div>

    <div class="serviceDesc">
      <h2>Gérez vos budgets</h2>
      <p class="serviceCard">Fixez vos limites et gardez le contrôle.</p>
    </div>

    <div class="serviceDesc">
      <h2>Recevez des alertes</h2>
      <p class="serviceCard">Anticipez les dépenses pour rester serein.</p>
    </div>
  </section>
</main>
