FROM node:18-alpine

WORKDIR /

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm install -g react-scripts

ARG REACT_APP_DOMAIN
ENV REACT_APP_DOMAIN $REACT_APP_DOMAIN

CMD ["npm", "run", "start"]
