import { CloudFrontClient, CreateDistributionCommand } from '@aws-sdk/client-cloudfront'
import { Callback, SQSEvent, SQSHandler, Context } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../entities'
import { v4 as uuid } from 'uuid'

export const pipelineSetup: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const message = JSON.parse(record.body)
      const pipeline = plainToClass(PipelineEntity, message)

      const client = new CloudFrontClient({})

      const command = new CreateDistributionCommand({
        DistributionConfig: {
          // DefaultRootObject: '', // I think this is /index.html?
          Origins: {
            Quantity: 1,
            Items: [
              {
                Id: uuid(), // uuid
                DomainName: `${process.env.DEPLOYMENT_LIVE_BUCKET_NAME}`, // string of S3 bucket
                OriginPath: `/pipeline/${pipeline.uniqueRepoName}`, // path to directory in bucket to view
              },
            ],
          },
          Aliases: {
            Quantity: 1,
            Items: [
              '', // not sure what this is suppose to be?
            ],
          },
          Comment: 'Cloudfront distribution for project ...',
          Enabled: true,
          CallerReference: 'project-name', // another unique reference to prevent distribution duplication
          DefaultCacheBehavior: {
            TargetOriginId: '', // no idea
            ViewerProtocolPolicy: 'redirect-to-https', // no idea
          },
        },
      })

      return client.send(command)
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
