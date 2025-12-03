Mini Application Immobilière - Test Technique

Description:
Application immobilière full-stack développée dans le cadre d'un test technique. L'application permet la gestion de propriétés immobilières avec un CRUD complet, des filtres et une pagination.

Technologies : React (TypeScript) + Express (TypeScript) + Zod

Installation et Lancement
Prérequis
Node.js (version v20.19.5)

npm ou yarn

Installation : 
1. Backend (Express)
cd backend
npm install
2. Frontend (React)
cd frontend
npm install 

Lancement de l'application:
******
cd backend
npm run dev
*******
cd frontend
npm start

Accès à l'application :
Frontend : http://localhost:3000

Backend API : http://localhost:3001

Architecture Technique:
Backend Structure (Express + TypeScript)

backend/
├── src/
│   ├── controllers/    # Contrôleurs (gestion des requêtes HTTP)
│   ├── services/       # Logique métier
│   ├── schemas/        # Validation avec Zod
│   ├── routes/         # Définition des routes API
│   ├── types/          # Interfaces TypeScript
│   └── data/           # Données JSON (simulation BDD)
└── index.ts           # Point d'entrée
**********
Frontend Structure (React + TypeScript)
text
frontend/
├── src/
│   ├── components/     # Composants réutilisables
│   ├── pages/          # Pages principales
│   ├── services/       # Appels API
│   ├── types/          # Interfaces TypeScript
│   ├── router/         # Configuration des routes
│   └── styles/         # Fichiers CSS
└── App.tsx            # Point d'entrée React

Cette architecture (Routes → Controllers → Services → Données) a été choisie car :

Scalabilité : Chaque couche peut évoluer indépendamment. Ajouter une base de données réelle ne toucherait que le service, pas les contrôleurs.

Maintenabilité : Le code est organisé par responsabilité, ce qui facilite la compréhension et les modifications futures.

Testabilité : Chaque composant peut être testé isolément.

Évolutivité : L'ajout de nouvelles fonctionnalités (cache, monitoring, logging) se fait sans perturber l'existant.





**Choix d'Express plutôt que Fastify**
J'ai choisi Express pour trois raisons principales :

Respect des contraintes du test : Le mail spécifiait clairement "backend Express ou Fastify au choix". J'ai donc sélectionné l'outil que je maîtrise le mieux pour me concentrer sur l'essentiel : produire une architecture solide et un code de qualité dans le temps imparti.

Productivité optimisée : Avec seulement 1h30-2h de développement, Express m'a permis d'être immédiatement productif. Sa documentation exhaustive et son écosystème mature m'ont fait gagner un temps précieux que j'ai pu investir dans la structure du projet plutôt que dans l'apprentissage d'un nouveau framework.

Architecture indépendante du framework : J'ai conçu l'application avec une séparation stricte des responsabilités. Les contrôleurs, services et modèles sont totalement découplés d'Express. Cette approche signifie qu'une migration vers Fastify serait simple et rapide, car seules les couches "route" et "controller" nécessiteraient des ajustements mineurs.

**Ce que j'aurais ajouté avec plus de temps**

Avec plus de temps, je me serais d'abord concentré sur les tests (Jest, React Testing Library, Cypress) pour garantir la fiabilité, puis sur l'amélioration technique avec React Query pour une meilleure gestion d'état et du monitoring avec Sentry. Ensuite, j'aurais ajouté des fonctionnalités métier comme l'authentification JWT, la recherche avancée et l'upload de photos, avant d'optimiser les performances avec du caching et du code splitting. Enfin, j'aurais mis en place une CI/CD et une documentation API complète pour un déploiement professionnel. Toutes ces évolutions sont facilitées par l'architecture modulaire déjà en place.



👨‍💻 Auteur
Nour Bouafoura 

📄 Licence
Projet réalisé dans le cadre d'un test technique