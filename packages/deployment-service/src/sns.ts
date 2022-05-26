import { NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'
import { NestExpressApplication } from '@nestjs/platform-express'

import { SNSHandler } from 'aws-lambda'
import { SnsHandlerProvider } from './events'

export const handle: SNSHandler = async (event) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const snsHandler = app.get(SnsHandlerProvider)
  await app.init()

  await snsHandler.handleMultiple(event.Records)
}
