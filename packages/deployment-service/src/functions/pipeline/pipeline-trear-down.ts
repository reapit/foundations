import { CloudFrontClient, DeleteDistributionCommand } from '@aws-sdk/client-cloudfront'
import { ChangeResourceRecordSetsCommand, Route53Client } from '@aws-sdk/client-route-53'
import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import { deletePipelineEntity, deletePipelineRunners, deleteTasksFromPipeline, s3Client, sqs } from '../../services'
import { PipelineEntity } from '../../entities'
import { QueueNames } from '../../constants'

const tearDownCloudFront = (Id: string): Promise<any> => {
  const frontClient = new CloudFrontClient({})

  return frontClient.send(
    new DeleteDistributionCommand({
      Id,
    }),
  )
}

const tearDownLiveBucketLocation = (location: string): Promise<void> => {
  return new Promise<void>((resolve, reject) =>
    s3Client.deleteObject(
      {
        Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
        Key: location,
      },
      (error) => {
        error ? reject(error) : resolve()
      },
    ),
  )
}

const tearDownR53 = (pipeline: PipelineEntity): Promise<any> => {
  const r53Client = new Route53Client({})
  return r53Client.send(
    new ChangeResourceRecordSetsCommand({
      HostedZoneId: process.env.HOSTED_ZONE_ID,
      ChangeBatch: {
        Changes: [
          {
            Action: 'DELETE',
            ResourceRecordSet: {
              Type: 'A',
              Name: `${pipeline.subDomain}.dev.paas.reapit.cloud`,
              AliasTarget: {
                DNSName: '',
                EvaluateTargetHealth: false,
                HostedZoneId: 'Z2FDTNDATAQYW2',
              },
            },
          },
        ],
        Comment: `Adding additional A record for pipeline [${pipeline.id}]`,
      },
    }),
  )
}

const deleteAllFromDb = async (pipeline: PipelineEntity) => {
  await deleteTasksFromPipeline(pipeline)
  await deletePipelineRunners(pipeline)
  await deletePipelineEntity(pipeline)
}

export const pipelineTearDown: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const pipeline: PipelineEntity = JSON.parse(record.body) as PipelineEntity

      await Promise.all([
        tearDownCloudFront(pipeline.cloudFrontId as string),
        tearDownLiveBucketLocation(`pipeline/${pipeline.uniqueRepoName}`),
        tearDownR53(pipeline),
      ])

      await deleteAllFromDb(pipeline)

      await new Promise<void>((resolve, reject) =>
        sqs.deleteMessage(
          {
            ReceiptHandle: record.receiptHandle,
            QueueUrl: QueueNames.PIPELINE_TEAR_DOWN,
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

  return callback('Successfully processed all records')
}
