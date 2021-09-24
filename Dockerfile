ARG LAMBDA_TASK_ROOT=/var/task

############ builder ###################
FROM node:16-buster as builder

ARG LAMBDA_TASK_ROOT

RUN --mount=type=cache,target=/var/cache/apt --mount=type=cache,target=/var/lib/apt apt-get update && \
    apt-get install -y \
    g++ \
    make \
    cmake \
    unzip \
    libcurl4-openssl-dev \
    rsync

# Copy the Lambda functions
COPY . ${LAMBDA_TASK_ROOT}/

ARG PACKAGE # Required
ARG NPM_TOKEN # Required

RUN --mount=type=cache,target=/tmp/stub cd $LAMBDA_TASK_ROOT && \
    cd "packages/$PACKAGE" && \
    yarn workspaces focus && \
    yarn build && \
    yarn workspaces focus --production && \
    cd ../../ && \
    export old_path=`pwd` && \
    mkdir -p /tmp/stub && cd /tmp/stub && \
    yarn init -y && \
    yarn add aws-lambda-ric && \
    # https://github.com/aws/aws-lambda-nodejs-runtime-interface-client/issues/28
    rm -rf \
        ./node_modules/aws-lambda-ric/deps/curl-*/autom4te.cache \
        ./node_modules/aws-lambda-ric/deps/curl-*/config.log \
        ./node_modules/aws-lambda-ric/deps/curl-*/configure \
        ./node_modules/aws-lambda-ric/deps/curl-*/docs \
        ./node_modules/aws-lambda-ric/deps/curl-*/projects \
        ./node_modules/aws-lambda-ric/deps/curl-*/tests \
        ./node_modules/aws-lambda-ric/deps/curl-*/README && \
    rsync -a /tmp/stub/node_modules/ $old_path/node_modules/

############ runner ###################
FROM node:16-buster-slim as runner

ARG LAMBDA_TASK_ROOT

COPY --from=builder ${LAMBDA_TASK_ROOT}/packages ${LAMBDA_TASK_ROOT}/packages
COPY --from=builder ${LAMBDA_TASK_ROOT}/node_modules ${LAMBDA_TASK_ROOT}/node_modules

WORKDIR ${LAMBDA_TASK_ROOT}
ENTRYPOINT ["node", "./node_modules/.bin/aws-lambda-ric"]