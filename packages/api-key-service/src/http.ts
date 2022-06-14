import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ApiKeyModule } from './api-keys'
import { createServer, proxy } from 'aws-serverless-express'
import express, { Express } from 'express'
import { ExpressAdapter } from '@nestjs/platform-express'
import { eventContext } from 'aws-serverless-express/middleware'
import { Server } from 'http'
import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { CorsHeaderInterceptor } from '@reapit/utils-node'

export const bootstrapApplication = async (): Promise<[INestApplication, Express]> => {
  const expressApp = express()
  const app = await NestFactory.create(ApiKeyModule, new ExpressAdapter(expressApp))

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new CorsHeaderInterceptor())

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

export const invokeAPiKeyVerify: Handler = async (event: APIGatewayEvent, context: Context) => {
  cachedServer = await bootstrapServer()
  event.path = event.path?.replace('api/', '')

  return proxy(cachedServer, event, context, 'PROMISE').promise
}
