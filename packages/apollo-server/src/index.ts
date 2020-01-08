import { Context, Handler } from 'aws-lambda'
import { server } from './app'
import serverless from 'serverless-http'

const app = serverless(server as any)

export const graphqlHandler: Handler<any, any> = async (event: any, context: Context) => app(event, context)
