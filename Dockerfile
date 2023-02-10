FROM reg.1cb.kz/dockerhub/library/node:16.17.1-alpine3.15

WORKDIR /var/www
COPY . ./
RUN ls /var/www

RUN yarn install

RUN npm run build:client
RUN npm run build:server

RUN ls /var/www/dist

ENV NODE_ENV=production

EXPOSE 5000

CMD [ "node", "server.js" ]
