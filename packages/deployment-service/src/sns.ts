import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'
import { SNSHandler } from 'aws-lambda'
import { SnsHandlerProvider } from './events'
import { INestApplication } from '@nestjs/common'

let app: INestApplication

const initApp = async (): Promise<NestApplication> => {
  // TODO change to createMicro
  const app = await NestFactory.create<NestApplication>(AppModule)
  await app.init()

  return app
}

export const handle: SNSHandler = async (event) => {
  app = app || (await initApp())

  const snsHandler = app.get(SnsHandlerProvider)

  await snsHandler.handleMultiple(event.Records)
}
