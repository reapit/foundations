FROM node:18-alpine

ARG NPM_TOKEN=""
WORKDIR /usr/foundations
COPY . .

RUN yarn set version berry 3.1.1

RUN yarn

EXPOSE 8080

CMD ["yarn", "workspace", "admin-portal", "start"]
