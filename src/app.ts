import 'isomorphic-fetch'
import { Context, Handler } from 'aws-lambda'
import server from './core/server'
import serverless from 'serverless-http'
;(global as any).navigator = {}

const app = serverless(server)

export const apiHandler: Handler<any, any> = async (event: any, context: Context) => app(event, context)
