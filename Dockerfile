# primeiro faz o build com o node
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts
COPY . .
# no github pages o site fica em /comparador-produtos/, aqui fica na raiz
RUN npm run build -- --base=/

# depois so copia o dist pro nginx
# essa imagem do nginx nao roda como root (o sonar reclamou), por isso a porta e 8080
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
