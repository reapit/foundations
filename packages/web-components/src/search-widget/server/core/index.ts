import 'isomorphic-fetch'
import { Context, APIGatewayProxyEvent } from 'aws-lambda'
import serverless from 'serverless-http'
import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './router'

const expressApp = express()

expressApp.use(cors())
expressApp.use(bodyParser.urlencoded({ extended: true }))
expressApp.use(bodyParser.json())
expressApp.use('/', router)
expressApp.use((err: Error, _req: Request, res: Response) => {
  console.error(JSON.stringify(err))
  res.json({
    error: {
      status,
      message: `Bad request': ${res.status} ${JSON.stringify(err)}`,
    },
  })
  res.end()
})

const app = serverless(expressApp)

export const searchWidgetHandler = async (event: APIGatewayProxyEvent, context: Context) => app(event, context)
