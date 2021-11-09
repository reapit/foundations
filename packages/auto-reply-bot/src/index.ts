import { createLambdaFunction, createProbot } from '@probot/adapter-aws-lambda-serverless'

export const webhooks = createLambdaFunction(() => {}, { probot: createProbot() })
