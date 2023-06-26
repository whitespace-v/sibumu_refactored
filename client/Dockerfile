FROM node:16.17.0-bullseye-slim
RUN npm i -g --silent http-server
WORKDIR /app
COPY ./package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["http-server", "--proxy", "http://localhost:8080?", "./dist"]