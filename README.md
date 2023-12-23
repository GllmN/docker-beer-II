# docker-beer-II

Répertoire Back-end (/backend)

/src
Contient le code source TypeScript du back-end.
/src/entity
Entités TypeORM représentant les tables de la base de données.
/src/controller
Contrôleurs pour gérer la logique métier de l'API.
/src/routes
Définitions des routes Express pour l'API.
/src/migration
Migrations TypeORM pour la gestion des schémas de base de données.
/src/data-source.ts
Configuration de la source de données TypeORM.
Dockerfile
Pour conteneuriser l'application Node.js.

Pour démarrer votre application en production :
```
npm run build
npm run start 
```

Pour démarrer votre application en développement :
```
npm run dev
```