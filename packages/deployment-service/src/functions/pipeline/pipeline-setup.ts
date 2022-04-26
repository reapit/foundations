import { CloudFrontClient, CreateDistributionCommand } from '@aws-sdk/client-cloudfront'
import { Callback, SQSEvent, SQSHandler, Context } from 'aws-lambda'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { v4 as uuid } from 'uuid'
import { Route53Client, ChangeResourceRecordSetsCommand } from '@aws-sdk/client-route-53'
import { sqs, updatePipelineEntity, pusher, assumedS3Client } from '../../services'
import { QueueNames } from '../../constants'
import { getRoleCredentials } from '../../services/sts'

export const pipelineSetup: SQSHandler = async (event: SQSEvent, context: Context, callback: Callback) => {
  await Promise.all(
    event.Records.map(async (record) => {
      const message = JSON.parse(record.body)
      const pipeline = plainToClass(PipelineEntity, message)
      pipeline.buildStatus = 'PROVISIONING'

      const s3Client = await assumedS3Client()

      try {
        await updatePipelineEntity(pipeline, {})
        await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
          ...pipeline,
          message: 'Started architecture build',
        })

        await new Promise<void>((resolve, reject) =>
          s3Client.putObject(
            {
              Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
              Key: `pipeline/${pipeline.uniqueRepoName}/index.html`,
              Body: '<html><body>Deployment required</body></html>',
              Metadata: {
                ['Content-Type']: 'text/html',
              },
            },
            (error) => {
              error ? reject(error) : resolve()
            },
          ),
        )

        await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
          ...pipeline,
          message: 'Bucket built',
        })

        const assumedRoles = await getRoleCredentials()

        const frontClient = new CloudFrontClient({
          region: process.env.REGION,
          credentials: assumedRoles,
        })

        const id = uuid()

        console.log('ssl', process.env.CERT_ARN, process.env.ROOT_DOMAIN)

        const distroCommand = new CreateDistributionCommand({
          DistributionConfig: {
            DefaultRootObject: 'index.html',
            ViewerCertificate: {
              ACMCertificateArn: process.env.CERT_ARN,
              SSLSupportMethod: 'sni-only',
              MinimumProtocolVersion: 'TLSv1.2_2021',
            },
            Origins: {
              Quantity: 1,
              Items: [
                {
                  Id: id,
                  DomainName: `${process.env.DEPLOYMENT_LIVE_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com`, // url of S3 bucket
                  OriginPath: `/pipeline/${pipeline.uniqueRepoName}`, // path to directory in bucket to view
                  S3OriginConfig: {
                    OriginAccessIdentity: '',
                  },
                },
              ],
            },
            Aliases: {
              Quantity: 1,
              Items: [`${pipeline.subDomain}.${process.env.ROOT_DOMAIN}`],
            },
            Comment: `Cloudfront distribution for pipeline [${pipeline.id}] [${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}]`,
            Enabled: true,
            CallerReference: `${pipeline.subDomain}`, // another unique reference to prevent distribution duplication
            DefaultCacheBehavior: {
              ForwardedValues: {
                Cookies: {
                  Forward: 'all',
                },
                QueryString: true,
              },
              MinTTL: 3600,
              TargetOriginId: id, // has to be the same as origin id :eyes_roll:
              ViewerProtocolPolicy: 'redirect-to-https', // no idea
            },
          },
        })

        const distroResult = await frontClient.send(distroCommand)

        await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
          ...pipeline,
          message: 'Distro created',
        })

        if (!distroResult) {
          throw new Error('cloudfront failed :shrug:')
        }

        const frontDomain = distroResult.Distribution?.DomainName
        const cloudFrontId = distroResult.Distribution?.Id

        const r53Client = new Route53Client({
          region: process.env.REGION,
          credentials: assumedRoles,
        })

        const ACommand = new ChangeResourceRecordSetsCommand({
          HostedZoneId: process.env.HOSTED_ZONE_ID,
          ChangeBatch: {
            Changes: [
              {
                Action: 'UPSERT',
                ResourceRecordSet: {
                  Type: 'A',
                  Name: `${pipeline.subDomain}.${process.env.ROOT_DOMAIN}`,
                  AliasTarget: {
                    DNSName: frontDomain,
                    EvaluateTargetHealth: false,
                    HostedZoneId: 'Z2FDTNDATAQYW2', // static cos cloudfront https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-aliastarget.html
                  },
                },
              },
            ],
            Comment: `Adding additional A record for pipeline [${pipeline.id}]  [${process.env.NODE_ENV === 'production' ? 'prod' : 'dev'}]`,
          },
        })

        const r53Result = await r53Client.send(ACommand)

        const aRecordId = r53Result.ChangeInfo?.Id

        await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
          ...pipeline,
          message: 'A record created',
        })

        const updatedPipeline = await updatePipelineEntity(pipeline, {
          buildStatus: 'READY_FOR_DEPLOYMENT',
          cloudFrontId,
          aRecordId,
        })
        await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
          ...updatedPipeline,
          message: 'Pipeline successfully created',
        })
      } catch (error: any) {
        pipeline.buildStatus = 'FAILED_TO_PROVISION'

        await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
          ...pipeline,
          message: 'Failed to architech',
        })
        await updatePipelineEntity(pipeline, {
          buildStatus: 'FAILED_TO_PROVISION',
        })
        console.error(error)
        throw error
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
