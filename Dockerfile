FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn add global next
RUN yarn

COPY . .

RUN yarn build

ENTRYPOINT ["yarn", "start"]
