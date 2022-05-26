import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'
import { WorkflowHandlerProvider } from './events/workflow-handler-provider'
import { SQSHandler } from 'aws-lambda'
import { INestApplication } from '@nestjs/common'

let app: INestApplication

const initApp = async (): Promise<NestApplication> => {
  const app = await NestFactory.create<NestApplication>(AppModule)
  await app.init()

  return app
}

export const handle: SQSHandler = async (event) => {
  app = app || await initApp()

  const workflowHandler = app.get(WorkflowHandlerProvider)

  await workflowHandler.handleMultiple(event.Records)
}
