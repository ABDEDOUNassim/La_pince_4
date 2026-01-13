## Présentation
Le but du projet est la création d’une application web de gestion de finance personnelle pour une entreprise fictive, à destination des particuliers.

## Définition des besoins et des objectifs
- Planifier dépenses
- Gérer facilement son budget
- Anticiper
- Suivre les dépenses 
- Catégoriser ses dépenses
- Alertes plafond de budget
		
## MVP
- Système d'authentification : inscription, connexion.
- Suivi des dépenses : ajout, modification, suppression de dépenses.
- Création de budgets : définition de budgets par catégorie (nourriture, factures, sorties, etc.) avec suivi du respect des limites.
- Alertes de dépenses : notifications lorsque les dépenses approchent ou dépassent les limites fixées.

## Les évolutions potentielles
- Filtres pour le tableau des dépenses (par catégorie, par montant etc)
- Recherche de dépenses par titre
- Séparer les dépenses par compte bancaire
- Tableau de bord : visualisation graphique de la situation financière globale (dépenses, budget).
- Gestion de groupes d’utilisateurs : pour gérer un budget à plusieurs (familles, collocation, etc.).
- Planification de l'épargne : définition d'objectifs d'épargne (vacances, gros achat etc) et suivi de la progression.console.log()
- Génération de rapports personnalisés : dépenses par période, catégorie, etc.
- Basculer entre le mode clair et mode Dark 


## Liste des technologies

Gestionnaire package: NPM 
Front: Vite/Svelte
Back: Node.js/Express
ORM : Sequelize
BDD : PostgreSQL

## Public visé par l’application 

Application pour des particuliers : étudiants, adultes, familles mais aussi pour travailleurs indépendants.

Les navigateurs compatibles 
L’objectif est la compatibilité avec tous les navigateurs (sauf IE).

## Arborescence de l’application

- Page d’accueil (“/”)
- Page de connexion (“/login”) 
- Page d'inscription (“/register”)
- Page espace perso (“/user/dashboard”)
- Page de catégories/budget (“/user/categories”)

## Users story

| # | En tant que | Je souhaite | Afin de | Sprint |
|---| --- | --- | --- | --- |
| 1 | Visiteur | Une page d’accueil | Présenter les fonctionnalités et accéder aux pages de login/register | 1 |
| 2 | Visiteur | Une page d’inscription | … | 1 |
| 3 | Visiteur | Une page de connexion | … | 1 |
| 4 | User | Une page des dépenses  | Consulter ses dépenses (+filtre) | 1-2 |
| 5 | User | Une page de catégories  | Définir des postes de dépenses et budgets associés | 1-2 |
| 6 | User | Des alertes si budget total max proche ou dépassé | … | 2 |
| 7 | User | Des alertes si budget max d’une catégorie proche ou dépassé | … | 2 |
| 8 | User | Des alertes si budget total max proche ou dépassé | … | 2 |
| 9 | User | Une page des dépenses  | Ajouter, modifier, supprimer une dépense | 2 |



## Rôles de 
Fabrice : Lead Front
Samira : Front
Lucas : Lead Back
Najat : Back
Nassim : Back 
