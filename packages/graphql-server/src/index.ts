import serverless from 'serverless-http'
import { Context, Handler } from 'aws-lambda'
import { server } from './app'

const app = serverless(server as any)

export const graphqlHandler: Handler<any, any> = async (event: any, context: Context) => app(event, context)
