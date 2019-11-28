import 'isomorphic-fetch'
import { Context, Handler, CognitoUserPoolTriggerHandler } from 'aws-lambda'
import server from './core/server'
import serverless from 'serverless-http'
import { customMailer } from './mailer/custom-mailer'
;(global as any).navigator = {}

const app = serverless(server)

export const apiHandler: Handler<any, any> = async (event: any, context: Context) => app(event, context)
export const mailHandler: CognitoUserPoolTriggerHandler = (event, context, callback) =>
  customMailer(event, context, callback)
