import 'isomorphic-fetch'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './router'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import serverless from 'serverless-http'
import { errorHandler } from '../../../common/utils/error-handler'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
app.use((err: Error, _req: Request, res: Response) => {
  errorHandler(err, res)
})

const expressApp = serverless(app)

export const parseHeadersFromEvent = (event: APIGatewayProxyEvent) => {
  const authorization = event?.requestContext?.authorizer?.authorization?.trim()
  const newHeaders = {
    ...event.headers,
    ...event?.requestContext?.authorizer,
    authorization: `Bearer ${authorization}`,
  } as { [name: string]: string }
  return newHeaders
}

export const searchWidgetHandler = async (event: APIGatewayProxyEvent, context: Context) => {
  console.log('searchWidgetHandler', { event, context })
  const newHeaders = parseHeadersFromEvent(event)
  event.headers = newHeaders
  console.log('searchWidgetHandler', { newHeaders })
  return expressApp(event, context)
}
