import { NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'
import { SNSHandler } from 'aws-lambda'
import { SnsHandlerProvider } from './events'
import { INestMicroservice } from '@nestjs/common'

let app: INestMicroservice

const initApp = async (): Promise<INestMicroservice> => {
  const app = await NestFactory.createMicroservice<INestMicroservice>(AppModule)
  await app.init()

  return app
}

export const handle: SNSHandler = async (event) => {
  app = app || (await initApp())

  const snsHandler = app.get(SnsHandlerProvider)

  await snsHandler.handleMultiple(event.Records)
}
