############ builder ###################
FROM amazon/aws-lambda-nodejs:14 as builder

# Copy the Lambda functions
COPY . ${LAMBDA_TASK_ROOT}/

ARG PACKAGE # Required
ARG HANDLER # Required
ARG NPM_TOKEN # Required

RUN cd $LAMBDA_TASK_ROOT && \
    npm install -g yarn && \
    cd "packages/$PACKAGE" && \
    yarn workspaces focus && \
    yarn build && \
    yarn workspaces focus --production

############ runner ###################
FROM amazon/aws-lambda-nodejs:14 as runner

COPY --from=builder ${LAMBDA_TASK_ROOT}/packages ${LAMBDA_TASK_ROOT}/packages
COPY --from=builder ${LAMBDA_TASK_ROOT}/node_modules ${LAMBDA_TASK_ROOT}/node_modules

ARG PACKAGE # Required
ARG HANDLER # Required

CMD ["node", "${LAMBDA_TASK_ROOT}/packages/${PACKAGE}/dist/${HANDLER}"]