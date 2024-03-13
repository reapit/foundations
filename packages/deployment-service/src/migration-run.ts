import {
  OnEventHandler,
  OnEventRequest,
  OnEventResponse,
} from 'aws-cdk-lib/custom-resources/lib/provider-framework/types'
import { Connection } from 'typeorm'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'
import { getConnectionToken } from '@nestjs/typeorm'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)

  await app.init()

  return app.get<Connection>(getConnectionToken())
}

export const migrationRun: OnEventHandler = async (event: OnEventRequest): Promise<OnEventResponse> => {
  const direction: 'run' | 'revert' = event.RequestType === 'Delete' ? 'revert' : 'run'

  const connection = await bootstrap()

  console.log('direction', direction, 'running...')

  await connection[direction === 'run' ? 'runMigrations' : 'undoLastMigration']()

  console.log('completed')

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
