import { bootstrap } from './server'
import { eventContext } from 'aws-serverless-express/middleware'
import { Server } from 'http'
import { createServer, proxy } from 'aws-serverless-express'
import { Handler, Context, APIGatewayEvent } from 'aws-lambda'
import { createPlatformAxiosInstance } from './axios'
import { isAdmin } from '@reapit/utils-nest'

console.log('isAdmin', isAdmin)

let cachedServer: Server

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    const app = await bootstrap(createPlatformAxiosInstance())

    app.use(eventContext())

    await app.init()

    cachedServer = createServer(app, undefined)
  }

  return cachedServer
}

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
  cachedServer = await bootstrapServer()

  return proxy(cachedServer, event, context, 'PROMISE').promise
}
