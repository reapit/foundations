import { NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'
import { WorkflowHandlerProvider } from './events/workflow-handler-provider'
import { SQSHandler } from 'aws-lambda'
import { INestMicroservice } from '@nestjs/common'

let app: INestMicroservice

const initApp = async (): Promise<INestMicroservice> => {
  const app = await NestFactory.createMicroservice<INestMicroservice>(AppModule)
  await app.init()

  return app
}

export const handle: SQSHandler = async (event) => {
  app = app || (await initApp())

  const workflowHandler = app.get(WorkflowHandlerProvider)

  await workflowHandler.handleMultiple(event.Records)
}
