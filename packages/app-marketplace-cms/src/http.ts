import { NestFactory } from '@nestjs/core'
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { AppModule } from './app-module'
import { ExpressAdapter } from '@nestjs/platform-express'
import { createServer, proxy } from 'aws-serverless-express'
import { Handler, Context, APIGatewayEvent } from 'aws-lambda'
import { eventContext } from 'aws-serverless-express/middleware'
import { Server } from 'http'
import express, { Express } from 'express'
import { CorsHeaderInterceptor } from '@reapit/utils-nest'

export const bootstrapApplication = async (): Promise<[INestApplication, Express]> => {
  const expressApp = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  app.useGlobalInterceptors(new CorsHeaderInterceptor())

  return [app, expressApp]
}

const binaryMimeTypes: string[] = []

let cachedServer: Server

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const [app, expressApp] = await bootstrapApplication()

    app.use(eventContext())

    await app.init()

    cachedServer = createServer(expressApp, undefined, binaryMimeTypes)
  }

  return cachedServer
}

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
  cachedServer = await bootstrapServer()

  Logger.log(event.path, 'PATH')

  return proxy(cachedServer, event, context, 'PROMISE').promise
}
