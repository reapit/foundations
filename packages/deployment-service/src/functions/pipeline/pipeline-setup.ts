import { CloudFrontClient, CreateDistributionCommand } from '@aws-sdk/client-cloudfront'
import { Callback, SQSEvent, SQSHandler, Context } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../entities'
import { v4 as uuid } from 'uuid'
import { Route53Client, ChangeResourceRecordSetsCommand } from '@aws-sdk/client-route-53'
import { s3Client, sqs } from '../../services'
import { QueueNames } from '../../constants'

export const pipelineSetup: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      try {
        const message = JSON.parse(record.body)
        const pipeline = plainToClass(PipelineEntity, message)

        console.log('pushing to s3')
        await new Promise<void>((resolve, reject) => s3Client.putObject({
          Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
          Key: `pipeline/${pipeline.uniqueRepoName}/index.html`,
          Body: '<html><body>Deployment required</body></html>',
        }, (error) => {
          error ? reject(error) : resolve()
        }))

        console.log('creating distro', {
          repoName: pipeline.uniqueRepoName,
          Origins: {
            DomainName: `${process.env.DEPLOYMENT_LIVE_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com`, // url of S3 bucket
            OriginPath: `/pipeline/${pipeline.uniqueRepoName}`, // path to directory in bucket to view
          },
        })

        const frontClient = new CloudFrontClient({
          region: process.env.REGION,
        })

        const id = uuid()

        const distroCommand = new CreateDistributionCommand({
          DistributionConfig: {
            DefaultRootObject: 'index.html',
            Origins: {
              Quantity: 1,
              Items: [
                {
                  Id: id,
                  DomainName: `${process.env.DEPLOYMENT_LIVE_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com`, // url of S3 bucket
                  OriginPath: `/pipeline/${pipeline.uniqueRepoName}`, // path to directory in bucket to view
                },
              ],
            },
            Aliases: {
              Quantity: 1,
              Items: [
                `${pipeline.subDomain}.reapit.cloud`, // not sure what this is suppose to be?
              ],
            },
            Comment: `Cloudfront distribution for pipeline [${pipeline.id}]`,
            Enabled: true,
            CallerReference: `${pipeline.subDomain}`, // another unique reference to prevent distribution duplication
            DefaultCacheBehavior: {
              TargetOriginId: id, // has to be the same as origin id :eyes_roll:
              ViewerProtocolPolicy: 'redirect-to-https', // no idea
            },
          },
        })

        const result2 = await frontClient.send(distroCommand)
        console.log('result2', result2)

        const r53Client = new Route53Client({
          region: 'eu-west-2',
        })

        console.log(
          'creating A record',
          JSON.stringify({
            HostedZoneId: process.env.HOSTED_ZONE_ID,
            ChangeBatch: {
              Changes: [
                {
                  Action: 'CREATE',
                  ResourceRecordSet: {
                    Type: 'A',
                    Name: `${pipeline.subDomain}.reapit.cloud`,
                    Region: process.env.REGION,
                  },
                },
              ],
              Comment: `Adding additional A record for pipeline [${pipeline.id}]`,
            },
          }),
        )

        const ACommand = new ChangeResourceRecordSetsCommand({
          HostedZoneId: process.env.HOSTED_ZONE_ID,
          ChangeBatch: {
            Changes: [
              {
                Action: 'CREATE',
                ResourceRecordSet: {
                  Type: 'A',
                  Name: `${pipeline.subDomain}.reapit.cloud`,
                  Region: process.env.REGION,
                },
              },
            ],
            Comment: `Adding additional cname for pipeline [${pipeline.id}]`,
          },
        })

        console.log('sending...')

        const result = await r53Client.send(ACommand)
        console.log('result', result)
      } catch (e) {
        console.error(e)
        throw e
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

// pipelineSetup({
//   Records: [{
//     messageId: '',
//     receiptHandle: '',
//     messageAttributes: {},
//     awsRegion: 'eu-west-2',
//     md5OfBody: '',
//     attributes: {
//       ApproximateReceiveCount: 'string',
//       SentTimestamp: 'string',
//       SenderId: 'string',
//       ApproximateFirstReceiveTimestamp: '',
//     },
//     eventSource: '',
//     eventSourceARN: '',
//     body: JSON.stringify({
//       id: '105fc8aa-aa6a-4854-9720-940661bad776',
//       subDomain: 'simple-roll',
//       developerId: '614d8827-93c0-485b-839d-da4d103ba767',
//       repository: "https://github.com/bashleigh/reapit-react-test"
//     }),
//   }],
// }, {} as Context, () => {})
