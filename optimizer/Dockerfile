FROM node:16.17.0-alpine
WORKDIR /app
RUN mkdir images
COPY ./package*.json  ./
RUN npm i
COPY . .
EXPOSE 80
CMD ["npm", "start"]
