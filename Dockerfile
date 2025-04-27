# Etapa 1: build da aplicação
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
RUN npm install -g @angular/cli

COPY . .
RUN npm run build --configuration=production



FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build app/dist/antares-app/browser /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

