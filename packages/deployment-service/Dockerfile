# FROM node:14
FROM public.ecr.aws/lambda/nodejs:14

# RUN npm i -g yarn

# RUN yarn build

COPY . /var/task

RUN ["chmod", "+x", "/var/task/packages/deployment-service/dist/main.js"]

EXPOSE 80

WORKDIR "/var/task/packages/deployment-service/dist/"

CMD ["/var/task/packages/deployment-service/dist/main.app"]
