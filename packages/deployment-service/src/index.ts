import server from './core/server'
import serverless from 'serverless-http'
import { APIGatewayProxyEvent, Context } from 'aws-lambda'

const handler = serverless(server as unknown as serverless.Application)

export const app = async (event: APIGatewayProxyEvent, context: Context) => handler(event, context)
