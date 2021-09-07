import { CloudFrontClient, CreateDistributionCommand } from '@aws-sdk/client-cloudfront'
import { Callback, SQSEvent, SQSHandler, Context } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../entities'
import { v4 as uuid } from 'uuid'
import { Route53Client, ChangeResourceRecordSetsCommand } from '@aws-sdk/client-route-53'
import { sqs } from '../../services'
import { QueueNames } from 'src/constants'

export const pipelineSetup: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      try {
        const message = JSON.parse(record.body)
        const pipeline = plainToClass(PipelineEntity, message)

        const r53Client = new Route53Client({})

        const cnameCommand = new ChangeResourceRecordSetsCommand({
          HostedZoneId: '',
          ChangeBatch: {
            Changes: [
              {
                Action: 'CREATE',
                ResourceRecordSet: {
                  Type: 'CNAME',
                  Name: pipeline.subDomain,
                },
              },
            ],
            Comment: `Adding additional cname for pipeline [${pipeline.id}]`,
          },
        })

        await r53Client.send(cnameCommand)

        const frontClient = new CloudFrontClient({})

        const distroCommand = new CreateDistributionCommand({
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
                `${pipeline.subDomain}`, // not sure what this is suppose to be?
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

        await frontClient.send(distroCommand)
      } catch (e) {
        console.error(e)
      } finally {
        await new Promise<void>((resolve, reject) =>
          sqs.deleteMessage(
            {
              ReceiptHandle: record.receiptHandle,
              QueueUrl: QueueNames.PIPELINE_SETUP,
            },
            (err) => {
              if (err) {
                reject(err)
              }
              resolve()
            },
          ),
        )
      }
    }),
  )

  return callback(null, `Successfully processed ${event.Records.length} records.`)
}
