FROM node:14

WORKDIR /usr/index

COPY package.json .

RUN npm install

COPY . .

EXPOSE 1000

CMD ["node","index.js"]
