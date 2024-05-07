FROM node:18.4.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --no-optional && npm cache clean --force

COPY . .

CMD ["npm", "start"]

EXPOSE  3000
