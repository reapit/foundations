import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app-module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { WorkflowHandlerProvider } from './events/workflow-handler-provider'

import { SQSHandler } from 'aws-lambda'

export const handle: SQSHandler = async (event) => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const workflowHandler = app.get(WorkflowHandlerProvider)

  await workflowHandler.handleMultiple('', event.Records)
}
