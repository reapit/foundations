import {
  OnEventHandler,
  OnEventRequest,
  OnEventResponse,
} from '@reapit/ts-scripts/src/cdk/components/stack-event-handler'
import { connect } from './../core'

export const migrationRun: OnEventHandler = async (event: OnEventRequest): Promise<OnEventResponse> => {
  const direction: 'run' | 'revert' = event.RequestType === 'Delete' ? 'revert' : 'run'

  const connection = await connect()

  console.log('direction', direction, 'running...')

  await connection[direction === 'run' ? 'runMigrations' : 'undoLastMigration']()

  console.log('completed')

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
