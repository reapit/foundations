import { NestFactory } from '@nestjs/core'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app-module'
import { ExpressAdapter } from '@nestjs/platform-express'
import { createServer, proxy } from 'aws-serverless-express'
import { Handler, Context, APIGatewayEvent } from 'aws-lambda'
import { eventContext } from 'aws-serverless-express/middleware'
import { Server } from 'http'
import express, { Express } from 'express'
import * as bodyParser from 'body-parser'
import { CorsHeaderInterceptor } from '@reapit/utils-nest'
import { APIGatewayProxyResult } from 'aws-lambda/trigger/api-gateway-proxy'
const crypto = require('crypto')

global.crypto = crypto

export const bootstrapApplication = async (cors: boolean = false): Promise<[INestApplication, Express]> => {
  const expressApp = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { cors })

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new CorsHeaderInterceptor())
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  return [app, expressApp]
}

const binaryMimeTypes: string[] = []

let cachedServer: Server

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const [app, express] = await bootstrapApplication()

    app.use(eventContext())

    await app.init()

    cachedServer = createServer(express, undefined, binaryMimeTypes)
  }

  return cachedServer
}

export const handler: Handler<APIGatewayEvent, APIGatewayProxyResult> = async (event, context: Context) => {
  cachedServer = await bootstrapServer()

  if (!event.path.includes('github')) {
    return {
      statusCode: 404,
      body: 'Not Found',
    }
  }

  event.path = event.path?.replace('api/', '')

  return proxy(cachedServer, event, context, 'PROMISE').promise
}
