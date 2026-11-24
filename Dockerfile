# primeiro faz o build com o node
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
# no github pages o site fica em /comparador-produtos/, aqui fica na raiz
RUN npm run build -- --base=/

# depois so copia o dist pro nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
