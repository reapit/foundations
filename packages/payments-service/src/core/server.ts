/* istanbul ignore file */
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { createServer, proxy } from 'aws-serverless-express'
import express, { Express } from 'express'
import { ExpressAdapter } from '@nestjs/platform-express'
import { eventContext } from 'aws-serverless-express/middleware'
import { Server } from 'http'
import { Handler, APIGatewayEvent, Context } from 'aws-lambda'
import { AppModule } from './app'
import config from '../../config.json'
import { CorsHeaderInterceptor } from './cors-header-interceptor'
import { BillingInterceptor } from './billing-interceptor'

export const bootstrapApplication = async (): Promise<[INestApplication, Express]> => {
  process.env = {
    ...process.env,
    ...config,
  }

  const expressApp = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp))

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new CorsHeaderInterceptor())
  app.useGlobalInterceptors(new BillingInterceptor())

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
