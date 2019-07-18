import 'isomorphic-fetch'
import { Context } from 'aws-lambda'
import server from './core/server'
import serverless from 'serverless-http'
;(global as any).navigator = {}

const app = serverless(server)

export const handler = async (event: any, context: Context) => app(event, context)
