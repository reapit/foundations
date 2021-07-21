FROM node:14
#FROM public.ecr.aws/lambda/nodejs:14

# RUN npm i -g yarn

# RUN yarn build

RUN mkdir /var/task

COPY . /var/task

RUN ls -la /var/task/

ENTRYPOINT ["node", "/var/task/packages/deployment-service/dist/main.js"]

EXPOSE 3000
