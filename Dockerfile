FROM node:18-alpine

WORKDIR /app

COPY ./index.js ./index.js
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./Dockerfile ./Dockerfile

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]