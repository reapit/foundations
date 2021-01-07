import serverless from 'serverless-http'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import server from './core/server'

const handler = serverless((server as unknown) as serverless.Application)

export const app = async (event: APIGatewayProxyEvent, context: Context) => handler(event, context)
