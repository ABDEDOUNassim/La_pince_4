# 🚀 Manuel de Déploiement  
## API "La Pince" sur Render

Ce document définit la marche à suivre pour garantir un deploiement sur render

> ⚠️ **Règle imortante** : le schéma doit utiliser des noms de tables au pluriel  
> (`users`, `categories`, `expenses`).

---

## 1️⃣ Configuration de l’Infrastructure (Dashboard Render)

### 🗄️ Base de données
- Créez une instance **PostgreSQL** 


- une fois la bdd creer identifiez (allez dans **info**):
  - **External URL** → pour les accès **locaux** (ex : vscode)
  - **Internal URL** → pour la **configuration de l’API** (sur render)

---

## 🖥️ Configuration de l’API (Web Service)

Configuration du **Web Service API** sur Render pour un projet utilisant un dossier `api`

### ⚙️ Settings du service API

| Paramètre        | Valeur à saisir                  |
|------------------|----------------------------------|
| Root Directory   | `./api`                            |
| Build Command    | `npm install && npm run db create `(**db:create est retirer apres le premier deploiment**)      **             |
| Start Command    | `npm start` (ou `node index.js`) |

---

### 🔐 Variables d’Environnement (onglet *Environment*)

```env
DATABASE_URL=<Internal PostgreSQL URL>
JWT_SECRET=<ta_phrase_secrète>
PORT=3000
