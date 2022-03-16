import { QueueNames } from '@/constants'
import { createPipelineEntity, findPipelinesByAppId, sqs } from '@/services'
import { AppDetailModel } from '@reapit/foundations-ts-definitions/types'
import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import axios from 'axios'
import { AppTypeEnum } from '@reapit/foundations-ts-definitions'

type AppEventType = {
  AppId: string
  Type: 'updated' | 'deleted' | 'created'
  TimeStamp: string
  ApplicationName: string
}

const getAppFromMarketPlace = async (appId: string): Promise<AppDetailModel> => {
  const response = await axios.get<AppDetailModel>(`${process.env.PLATFORM_URL}/marketplace/apps/${appId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'api-version': 'latest',
      'Content-Type': 'application/json',
    },
  })

  if (response.status !== 200) {
    throw new Error('failed to get app from platform')
  }

  return response.data
}

export const appEventsHandler: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const payload: AppEventType = JSON.parse(record.body) as AppEventType

      switch (payload.Type) {
        case 'created': {
          console.log('initiate pipeline creation')
          const app = await getAppFromMarketPlace(payload.AppId)

          const pipeline = await createPipelineEntity({
            appId: app.id,
            name: app.name,
            appType: app.authFlow === 'authorisationCode' ? AppTypeEnum.REACT : AppTypeEnum.NODE,
          })

          await new Promise<void>((resolve, reject) =>
            sqs.sendMessage(
              {
                MessageBody: JSON.stringify(pipeline),
                QueueUrl: QueueNames.PIPELINE_SETUP,
              },
              (error) => {
                if (error) {
                  reject(error)
                }
                resolve()
              },
            ),
          )

          break
        }
        case 'deleted': {
          const pipelines = await findPipelinesByAppId(payload.AppId)

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

      await new Promise<void>((resolve, reject) =>
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
