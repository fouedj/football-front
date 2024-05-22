# Utiliser une image de base contenant Node.js 18 pour construire l'application
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si présent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Utiliser une image de base plus légère pour servir l'application
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire de nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
