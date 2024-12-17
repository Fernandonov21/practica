# Etapa 0: Construcción del frontend con React y Vite
FROM node:18 AS stage-0

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY practica/package.json practica/package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente del frontend
COPY practica /app/

# Construir el proyecto con Vite
RUN npm run build

# Etapa 1: Servir el frontend con Nginx
FROM nginx:alpine AS stage-1

# Copiar los archivos construidos desde la etapa anterior
COPY --from=stage-0 /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para servir el frontend
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
