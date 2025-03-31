# Dockerfile
FROM node:20-alpine

# Créer un utilisateur non-root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copier les fichiers de configuration d'abord pour optimiser le cache
COPY package*.json ./
COPY tsconfig.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY src/ ./src/

# Compiler TypeScript
RUN npm run build

# Changer les permissions
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE ${PING_LISTEN_PORT:-3000}

CMD ["node", "dist/index.js"]