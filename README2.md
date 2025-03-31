# TP Docker Compose - API Ping avec équilibrage de charge

## Objectifs
- Mettre en place une architecture multi-conteneurs avec Docker Compose
- Configurer un reverse proxy Nginx pour équilibrer la charge entre 4 réplicas
- Observer le load balancing en action via les logs

## Prérequis
- Docker Engine (v24.0+ recommandé)
- Docker Compose V2 (intégré dans Docker)
- Ubuntu 22.04 LTS

## Architecture

┌─────────────────┐ ┌───────────────┐ ┌──────────────────┐
│ Client │ │ Nginx │ │ API (4 replicas) │
│ (localhost:8080)├────►│ (Reverse Proxy)├───┬►│ • api_1:3000 │
└─────────────────┘ └───────────────┘ │ │ • api_2:3000 │
│ │ • api_3:3000 │
│ └• api_4:3000 │
└──────────────────┘


## Démarrer l'application

1. **Construire les images**:
docker compose build

2. **Lancer les services**:
docker compose up -d

3. **Vérifier l'état** :
docker compose ps

## Tester le load balancing

1. **Envoyer des requêtes**:
curl http://localhost:8080/ping
```Répéter plusieurs fois```

2. **Observer les logs:**
docker compose logs api

## Commandes utiles

**docker compose down:** Arrêter tous les conteneurs
**docker compose restart nginx:** Redémarrer le reverse proxy
**docker compose scale api=4:**	Ajuster le nombre de réplicas
**docker stats:**	Voir l'utilisation des ressources

## Configuration clé

    Nginx : Équilibrage de charge round-robin par défaut

    API : Chaque instance loggue son hostname

    Réseau : Isolation via un réseau Docker dédié

## Structure du projet
WIK-DPS-TP03/
├── src/
│   └── index.ts               # Point d'entrée de l'application
├── count.c                    # Fichier source pour le bonus (0-10000)
├── dist/index.js                     # Dossier de build (généré automatique)
├── Dockerfile                 # Build single-stage
├── Dockerfile.multistage      # Build multi-stage
├── Dockerfile.bonus           # Build ultra-léger
├── docker-compose.yml         # Configuration pour ├── docker-compose-bonus.yml 
Docker Compose
├── .dockerignore              
├── .env                       # Variables d'environnement
├── .gitignore
├── eslint.config.mjs          # Configuration ESLint
├── nginx.conf                 # Configuration du reverse proxy
├── wp-nginx-bonus.conf        # Configuration du reverse proxy pour exo bonus
├── package-lock.json         
├── package.json               # Configuration du projet
├── tsconfig.json              # Configuration TypeScript
├── README.md  
└── README2.md                 # Documentation

## Bonus : WordPress 3-tiers

Pour déployer l'architecture bonus :
docker compose -f docker-compose-bonus.yml up -d