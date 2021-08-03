FROM amazon/aws-lambda-nodejs:14

# Copy the Lambda functions
COPY . ${LAMBDA_TASK_ROOT}/

ARG PACKAGE # Required
ARG HANDLER # Required
ARG NPM_TOKEN # Required

RUN echo "PACKAGE: $PACKAGE"
RUN echo "HANDLER: $HANDLER"

CMD ["node", "${LAMBDA_TASK_ROOT}/packages/${PACKAGE}/dist/${HANDLER}"]

# Install dependencies for building
RUN cd $LAMBDA_TASK_ROOT && \
    npm install -g yarn && \
    yarn workspaces focus "packages/$PACKAGE" && \
    yarn workspace "packages/$PACKAGE" build && \
    yarn workspaces focus "packages/$PACKAGE" --production
