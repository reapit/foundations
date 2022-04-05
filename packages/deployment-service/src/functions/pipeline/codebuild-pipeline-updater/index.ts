import { Context, Callback, SNSEvent, SNSHandler } from 'aws-lambda'
import { handlePhaseChange } from './handle-phase-change'
import { handleStateChange } from './handle-state-change'
import { BuildPhaseChangeStatusEvent, BuildStateChangeEvent, EventEnum } from './types'

export const codebuildPipelineUpdater: SNSHandler = async (
  event: SNSEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  await Promise.all(
    event.Records.map(async (record) => {
      const event: BuildPhaseChangeStatusEvent | BuildStateChangeEvent = JSON.parse(record.Sns.Message)

      const buildId = event.detail['build-id']?.split(':')?.pop()

      switch (event['detail-type']) {
        case EventEnum.PHASE_CHANGE:
          if (!buildId) {
            throw new Error('no buildId found')
          }

          return handlePhaseChange({
            event,
            buildId,
          })
        case EventEnum.STATE_CHANGE:
          if (!buildId) {
            throw new Error('no buildId found')
          }

          return handleStateChange({
            event,
            buildId,
          })
        default:
          throw new Error(`Event type [${event['detail-type']}] not supported`)
      }
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
