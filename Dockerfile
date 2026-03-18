FROM node:18-alpine

WORKDIR /app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

COPY ./index.js ./index.js
COPY ./Dockerfile ./Dockerfile

EXPOSE 3000

CMD ["node", "index.js"]