## Projet API Ping

Ce projet est une API simple développée en TypeScript qui retourne les headers 
de la requête au format JSON lorsqu'une requête HTTP GET est envoyée 
sur "/ping". Pour toutes les autres routes, une réponse vide avec un code 404 est renvoyée.

## Pour le développement
- Node.js (v18.19.1 ou supérieur)
- npm (9.2.0 ou supérieur)
- Docker (pour les builds conteneurisés)

## Dépendances
- express
- dotenv
- TypeScript
- @types/express
- @types/node

## Fonctionnalités Docker
- Deux versions d'images Docker :
- Version single-stage optimisée
- Version multi-stage pour la production
- Configuration avec utilisateur non-root pour la sécurité
- Image bonus ultra-légère (<500B)

## Installation

 1. Clonez ce dépôt
 git clone https://github.com/mimy-gmc/wik-dps-tpO1.git

 git clone https://github.com/mimy-gmc/wik-dps-tpO2.git

 cd wik-dps-tpO1
 cd wik-dps-tpO2

 2. Installez les dépendances (TypeScript, express, node, npm, nodemon, dotenv) :
 npm install
 ou
 yarn install

## Configuration

L'API utilise une variable d'environnement pour configurer le port d'écoute:
PING_LISTEN_PORT: Port sur lequel le serveur écoute (par défaut: 8080)

Vous pouvez définir cette variable dans un fichier .env à la racine du projet:
PING_LISTEN_PORT=3000

## Développement

1. Pour démarrer le serveur :
- en mode développement avec redémarrage automatique :
npm run dev, yarn dev

- en mode Built (en local) : 
npm start, npx tsc

2. Construction de l'image Docker:
- Build de l'image single-stage :
docker build -t api-ping:1.0 .

- Build de l'image multi-stage :
docker build -t api-ping-prod:1.0 -f Dockerfile.multistage .

3. Lancer le conteneur :
lancement de vos conteneurs comme ceci : 
docker run -p 3000:3000 api-ping:1.0
ou
docker-compose up

4. Scanner l'image construite : 
trivy image api-ping:1.0
trivy image api-ping-prod:1.0

5. Pour l'exo sur le Bonus:
docker build -t bonus -f dockerfile.bonus .
docker run --rm bonus

6. Verification des images construites : 
- La vérification de la taille de l'image bonus
docker images | grep bonus

- La vérification des images créées : 
docker images

## Compilation et exécution

 1. Compilez le code TypeScript :
 npx tsc
 
 2. Exécutez le serveur :
 il lance l'application en mode développement avec redémarrage automatique
 npm run dev
 ou
 yarn run dev

## Utilisation

 - Envoyez une requête GET à `/ping` pour recevoir les en-têtes de votre requête au format JSON.
comme ceci : 
{
  "headers": {
    "host": "localhost:3000",
    "user-agent": "curl/7.68.0",
    "accept": "*/*"
  }
}

 - Toute autre requête recevra une réponse vide avec un code d'état 404.
  curl http://localhost:3000/ping

## Scan de sécurité

Trivy est un excellent scanner de vulnérabilités :

trivy image api-ping:1.0
trivy image api-ping-prod:1.0

## Structure du projet
WIK-DPS-TP02/
├── src/
│   └── index.ts               # Point d'entrée de l'application
├── count.c                    # Fichier source pour le bonus (0-10000)
├── dist/                      # Dossier de build (généré automatique)
├── Dockerfile                 # Build single-stage
├── Dockerfile.multistage      # Build multi-stage
├── Dockerfile.bonus           # Build ultra-léger
├── docker-compose.yml         # Configuration pour Docker Compose
├── .dockerignore              
├── .env                       # Variables d'environnement
├── .gitignore
├── eslint.config.mjs          # Configuration ESLint
├── package-lock.json         
├── package.json              # Configuration du projet
├── tsconfig.json             # Configuration TypeScript
└── README.md                 # Documentation

## Bonus

Pour builder et exécuter l'image bonus :
docker build -t bonus -f dockerfile.bonus .
docker run --rm bonus

## Licence

[MIT](LICENSE)