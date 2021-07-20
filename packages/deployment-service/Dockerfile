FROM node:14
#FROM public.ecr.aws/lambda/nodejs:14

RUN mkdir /var/task

COPY . /var/task/

# RUN npm i -g yarn

RUN ls -la /var/task/packages/deployment-service/dist/deployment-service/src/

RUN cd /var/task/packages/deployment-service/
# RUN yarn build

ENTRYPOINT ["node", "/var/task/packages/deployment-service/dist/deployment-service/src/index.js"]

EXPOSE 3000
