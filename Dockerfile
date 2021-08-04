ARG LAMBDA_TASK_ROOT=/var/task

############ builder ###################
FROM node:14-buster as builder

ARG LAMBDA_TASK_ROOT

RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev

# Copy the Lambda functions
COPY . ${LAMBDA_TASK_ROOT}/

ARG PACKAGE # Required
ARG HANDLER # Required
ARG NPM_TOKEN # Required

RUN cd $LAMBDA_TASK_ROOT && \
    cd "packages/$PACKAGE" && \
    yarn workspaces focus && \
    yarn build && \
    yarn workspaces focus --production && \
    # https://github.com/aws/aws-lambda-nodejs-runtime-interface-client/issues/28
    rm -rf \
        node_modules/aws-lambda-ric/deps/curl-*/autom4te.cache \
        node_modules/aws-lambda-ric/deps/curl-*/config.log \
        node_modules/aws-lambda-ric/deps/curl-*/configure \
        node_modules/aws-lambda-ric/deps/curl-*/docs \
        node_modules/aws-lambda-ric/deps/curl-*/projects \
        node_modules/aws-lambda-ric/deps/curl-*/tests \
        node_modules/aws-lambda-ric/deps/curl-*/README

############ runner ###################
FROM node:12-buster-slim as runner

ARG LAMBDA_TASK_ROOT

COPY --from=builder ${LAMBDA_TASK_ROOT}/packages ${LAMBDA_TASK_ROOT}/packages
COPY --from=builder ${LAMBDA_TASK_ROOT}/node_modules ${LAMBDA_TASK_ROOT}/node_modules

ARG PACKAGE # Required
ARG HANDLER # Required

ENTRYPOINT ["/usr/local/bin/npx", "aws-lambda-ric"]
CMD ["node", "${LAMBDA_TASK_ROOT}/packages/${PACKAGE}/dist/${HANDLER}"]