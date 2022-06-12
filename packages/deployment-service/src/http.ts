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
import { CorsHeaderInterceptor } from '@reapit/utils-node'

export const bootstrapApplication = async (): Promise<[INestApplication, Express]> => {
  const expressApp = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))

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

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
  cachedServer = await bootstrapServer()

  event.path = event.path?.replace('api/', '')

  return proxy(cachedServer, event, context, 'PROMISE').promise
}
