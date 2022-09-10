FROM node:18-alpine

RUN mkdir /backend
WORKDIR /backend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
