FROM public.ecr.aws/lambda/nodejs:12

ARG FUNCTION_DIR="/var/task"

# Create function directory
RUN mkdir -p ${FUNCTION_DIR}

ADD ../ ${FUNCTION_DIR}

RUN yum install -y git
RUN npm i -g yarn

WORKDIR ${FUNCTION_DIR}

RUN yarn set version berry

# RUN yarn

# You can overwrite command in `serverless.yml` template
CMD ["app.handler"]
