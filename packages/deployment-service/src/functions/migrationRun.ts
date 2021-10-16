import { OnEventHandler, OnEventRequest, OnEventResponse } from '@aws-cdk/custom-resources/lib/provider-framework/types'
import { connect } from './../core'

export const migrationRun: OnEventHandler = async (event: OnEventRequest): Promise<OnEventResponse> => {
  // console.log('env', process.env)
  const direction: 'run' | 'revert' = event.RequestType === 'Delete' ? 'revert' : 'run'

  const connection = await connect()

  await connection[direction === 'run' ? 'runMigrations' : 'undoLastMigration']()

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
