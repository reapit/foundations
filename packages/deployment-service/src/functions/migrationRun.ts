import { OnEventHandler, OnEventRequest, OnEventResponse } from '@aws-cdk/custom-resources/lib/provider-framework/types'
import { connect, logger } from './../core'
import { Observable } from 'rxjs'
import { delay, retryWhen, scan } from 'rxjs/operators'
import { defer, lastValueFrom } from 'rxjs'

const retryAttempts = 9
const retryDelay = 3000

const createConnection = async () => {
  return await lastValueFrom(
    defer(() => {
      return connect()
    }).pipe(handleRetry),
  )
}

const handleRetry = <T>(source: Observable<T>) => {
  return source.pipe(
    retryWhen((e) =>
      e.pipe(
        scan((errorCount, error: Error) => {
          logger.error(`Unable to connect to the database. Retrying (${errorCount + 1})...`, error.stack)
          if (errorCount + 1 >= retryAttempts) {
            throw error
          }
          return errorCount + 1
        }, 0),
        delay(retryDelay),
      ),
    ),
  )
}

export const migrationRun: OnEventHandler = async (event: OnEventRequest): Promise<OnEventResponse> => {
  const direction: 'run' | 'revert' = event.RequestType === 'Delete' ? 'revert' : 'run'

  const connection = await createConnection()

  await connection[direction === 'run' ? 'runMigrations' : 'undoLastMigration']()

  return {
    PhysicalResourceId: event.PhysicalResourceId,
  }
}
