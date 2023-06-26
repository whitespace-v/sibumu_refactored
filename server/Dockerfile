FROM node:16.17.0-bullseye-slim
ADD ./certs/Russian_CA.pem /usr/local/share/ca-certificates/Russian_CA.crt
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/Russian_CA.crt
WORKDIR /app
COPY ./package*.json  ./
RUN npm ci
COPY . .
EXPOSE 9000
CMD ["npm", "start"]
