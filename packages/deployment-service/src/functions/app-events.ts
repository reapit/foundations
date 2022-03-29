import { QueueNames } from '@/constants'
import { createPipelineEntity, findPipelinesByAppId, sqs } from '@/services'
import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import { AppTypeEnum } from '@reapit/foundations-ts-definitions'

type AppEventType = {
  AppId: string
  Type: 'updated' | 'deleted' | 'created'
  TimeStamp: string
  ApplicationName: string
  AuthFlow: string
  DeveloperId: string
}

export const appEventsHandler: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const payload: AppEventType = JSON.parse(record.body) as AppEventType

      switch (payload.Type) {
        case 'created': {
          await createPipelineEntity({
            buildStatus: 'PRE_PROVISIONED',
            appId: payload.AppId,
            id: payload.AppId,
            name: payload.ApplicationName,
            appType: payload.AuthFlow === 'authorisationCode' ? AppTypeEnum.REACT : AppTypeEnum.NODE,
            developerId: payload.DeveloperId,
          })

          break
        }
        case 'deleted': {
          const pipelines = await findPipelinesByAppId(payload.AppId)

          if (!pipelines || pipelines.length === 0) return

          await Promise.all(
            pipelines.map(
              (pipeline) =>
                new Promise<void>((resolve, reject) =>
                  sqs.sendMessage(
                    {
                      QueueUrl: QueueNames.PIPELINE_TEAR_DOWN_START,
                      MessageBody: JSON.stringify(pipeline),
                    },
                    (error) => {
                      error ? reject(error) : resolve()
                    },
                  ),
                ),
            ),
          )
          break
        }
        default:
          console.log(`unsupported event type [${payload.Type}] for AppId [${payload.AppId}]`)
      }

      return await new Promise<void>((resolve, reject) =>
        sqs.deleteMessage(
          {
            ReceiptHandle: record.receiptHandle,
            QueueUrl: QueueNames.APP_EVENTS,
          },
          (err) => {
            if (err) {
              reject(err)
            }
            resolve()
          },
        ),
      )
    }),
  )

  return callback(undefined, 'Resolved all messages')
}
