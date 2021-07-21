FROM node:14
#FROM public.ecr.aws/lambda/nodejs:14

RUN mkdir /var/task

COPY . /var/task/

# RUN npm i -g yarn

RUN cd /var/task/packages/deployment-service/
# RUN yarn build

ENTRYPOINT ["node", "/var/task/packages/deployment-service/dist/main.js"]

EXPOSE 3000
