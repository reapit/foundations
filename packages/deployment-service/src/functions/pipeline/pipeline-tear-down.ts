import {
  CloudFrontClient,
  DeleteDistributionCommand,
  DistributionConfig,
  GetDistributionCommand,
  UpdateDistributionCommand,
} from '@aws-sdk/client-cloudfront'
import { ChangeResourceRecordSetsCommand, Route53Client } from '@aws-sdk/client-route-53'
import { SQSEvent, SQSHandler, Context, Callback } from 'aws-lambda'
import {
  deletePipelineEntity,
  deletePipelineRunners,
  deleteTasksFromPipeline,
  pusher,
  s3Client,
  sqs,
  updatePipelineEntity,
} from '../../services'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { QueueNames } from '../../constants'
import { plainToClass } from 'class-transformer'

const tearDownCloudFront = async (Id: string): Promise<string> => {
  const frontClient = new CloudFrontClient({})

  const cloudFrontDistro = await frontClient.send(
    new GetDistributionCommand({
      Id,
    }),
  )

  await frontClient.send(
    new DeleteDistributionCommand({
      Id,
      IfMatch: cloudFrontDistro.ETag,
    }),
  )

  return cloudFrontDistro.Distribution?.DomainName as string
}

const disableCloudFront = async (Id: string): Promise<any> => {
  const frontClient = new CloudFrontClient({})

  const cloudFrontDistro = await frontClient.send(
    new GetDistributionCommand({
      Id,
    }),
  )

  const config = cloudFrontDistro.Distribution?.DistributionConfig as DistributionConfig

  return frontClient.send(
    new UpdateDistributionCommand({
      Id,
      DistributionConfig: {
        Enabled: false,
        DefaultRootObject: config.DefaultRootObject,
        Origins: config.Origins,
        Comment: config.Comment,
        DefaultCacheBehavior: config.DefaultCacheBehavior,
        CallerReference: config.CallerReference,
        PriceClass: config.PriceClass,
        Aliases: config.Aliases,
        Logging: config.Logging,
        WebACLId: config.WebACLId,
        HttpVersion: config.HttpVersion,
        CacheBehaviors: config.CacheBehaviors,
        CustomErrorResponses: config.CustomErrorResponses,
        ViewerCertificate: config.ViewerCertificate,
        Restrictions: config.Restrictions,
      },
      IfMatch: cloudFrontDistro.ETag,
    }),
  )
}

const tearDownLiveBucketLocation = (location: string): Promise<void> => {
  return new Promise<void>((resolve) =>
    s3Client.deleteObject(
      {
        Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
        Key: location,
      },
      () => {
        resolve()
        // error ? reject(error) : resolve()
      },
    ),
  )
}

const tearDownR53 = (domain: string, pipelineId: string, subDomain: string): Promise<any> => {
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
              Name: `${subDomain}.${process.env.NODE_ENV === 'PROD' ? 'prod' : 'dev'}.paas.reapit.cloud`,
              AliasTarget: {
                DNSName: domain,
                EvaluateTargetHealth: false,
                HostedZoneId: 'Z2FDTNDATAQYW2',
              },
            },
          },
        ],
        Comment: `Adding additional A record for pipeline [${pipelineId}]`,
      },
    }),
  )
}

const deleteAllFromDb = async (pipeline: PipelineEntity) => {
  await deleteTasksFromPipeline(pipeline)
  await deletePipelineRunners(pipeline)
  await deletePipelineEntity(pipeline)
}

export const pipelineTearDownStart: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const payload: PipelineEntity = JSON.parse(record.body)
      const pipeline = plainToClass(PipelineEntity, payload)

      if (pipeline.buildStatus !== 'PRE_PROVISIONED' && pipeline.hasDistro)
        await disableCloudFront(pipeline.cloudFrontId as string)

      await Promise.all([
        updatePipelineEntity(pipeline, {
          buildStatus: 'SCHEDULED_FOR_DELETION',
        }),
        new Promise<any>((resolve, reject) =>
          sqs.sendMessage(
            {
              QueueUrl: QueueNames.PIPELINE_TEAR_DOWN,
              MessageBody: JSON.stringify(pipeline),
              DelaySeconds: 500,
            },
            (error, data) => {
              error ? reject(error) : resolve(data)
            },
          ),
        ),
        new Promise<any>((resolve, reject) =>
          sqs.deleteMessage(
            {
              QueueUrl: QueueNames.PIPELINE_TEAR_DOWN_START,
              ReceiptHandle: record.receiptHandle,
            },
            (error, data) => {
              error ? reject(error) : resolve(data)
            },
          ),
        ),
      ])
    }),
  )

  return callback(undefined, 'Resolved all messages')
}

export const pipelineTearDown: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const pipeline: PipelineEntity = JSON.parse(record.body) as PipelineEntity

      if (pipeline.buildStatus !== 'PRE_PROVISIONED') {
        await tearDownLiveBucketLocation(`pipeline/${pipeline.uniqueRepoName}`)

        if (pipeline.hasDistro) {
          const domainName = await tearDownCloudFront(pipeline.cloudFrontId as string)

          if (pipeline.hasRoute53) await tearDownR53(domainName, pipeline.id as string, pipeline.subDomain as string)
        }
      }

      await deleteAllFromDb(pipeline)
      pipeline.buildStatus = 'DELETED'
      await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', pipeline)

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

  return callback(undefined, 'Successfully processed all records')
}
