const { createLambdaFunction, createProbot } = require('@probot/adapter-aws-lambda-serverless')

export const webhooks = createLambdaFunction(() => {}, { probot: createProbot() })
