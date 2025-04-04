import { AbstractWorkflow, PusherProvider, SqsProvider, Workflow } from '../events'
import { S3Provider } from '../s3'
import { PipelineProvider } from './pipeline-provider'
import {
  CloudFrontClient,
  CreateDistributionCommand,
  ListOriginAccessControlsCommand,
} from '@aws-sdk/client-cloudfront'
import { PipelineEntity } from '../entities/pipeline.entity'
import { v4 as uuid } from 'uuid'
import { ChangeResourceRecordSetsCommand, Route53Client } from '@aws-sdk/client-route-53'
import { QueueNamesEnum } from '../constants'
import { MarketplaceProvider } from '../marketplace'

@Workflow(QueueNamesEnum.PIPELINE_SETUP, () => PipelineEntity)
export class PipelineSetupWorkflow extends AbstractWorkflow<PipelineEntity> {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    sqsProvider: SqsProvider,
    private readonly pusherProvider: PusherProvider,
    private readonly s3Provider: S3Provider,
    private readonly cloudfrontClient: CloudFrontClient,
    private readonly route53Client: Route53Client,
    private readonly marketplaceProvider: MarketplaceProvider,
  ) {
    super(sqsProvider)
  }

  async execute(pipeline: PipelineEntity): Promise<void> {
    pipeline.buildStatus = 'PROVISIONING'

    try {
      await this.pipelineProvider.update(pipeline, {})
      await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...pipeline,
        message: 'Started architecture build',
      })

      const pipelineSubDomain = `${pipeline.subDomain}.iaas${process.env.APP_STAGE === 'production' ? '' : '.dev'}.paas.reapit.cloud`

      await this.s3Provision(pipeline)

      const distroResult = await this.createDistro(pipeline, pipelineSubDomain)

      if (!distroResult) {
        // TODO this did not error??? why???
        throw new Error('cloudfront failed :shrug:')
      }

      console.log('distro', distroResult)
      console.log('distro', JSON.stringify(distroResult))

      const frontDomain = distroResult.Distribution?.DomainName
      const cloudFrontId = distroResult.Distribution?.Id

      const aRecordId = await this.createARecord(pipeline, frontDomain as string)

      const appDetails = await this.marketplaceProvider.getAppDetails(pipeline.appId as string)

      await this.marketplaceProvider.updateAppUrls(
        pipeline.appId as string,
        pipelineSubDomain,
        pipeline.developerId as string,
        appDetails.name as string,
        appDetails.redirectUris,
        appDetails.signoutUris,
      )

      const updatedPipeline = await this.pipelineProvider.update(pipeline, {
        buildStatus: 'READY_FOR_DEPLOYMENT',
        cloudFrontId,
        aRecordId,
      })
      await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...updatedPipeline,
        message: 'Pipeline successfully created',
      })
    } catch (error) {
      await this.failedToDeploy(pipeline)
      console.error(error)
    } finally {
      await this.deleteMessage()
    }
  }

  private async findOACId(): Promise<string | undefined> {
    const result = await this.cloudfrontClient.send(new ListOriginAccessControlsCommand({}))

    return result.OriginAccessControlList?.Items?.find((item) => item.Name === 'distro-to-s3')?.Id
  }

  private async createDistro(pipeline: PipelineEntity, pipelineSubDomain: string) {
    const id = uuid()

    const AOCId = await this.findOACId()

    if (!AOCId) throw new Error('Could not resolve AOCId')

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
              OriginAccessControlId: AOCId,
            },
          ],
        },
        Aliases: {
          Quantity: 1,
          Items: [
            pipelineSubDomain,
          ],
        },
        Comment: `Cloudfront distribution for pipeline [${pipeline.id}] [${
          process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
        }]`,
        CustomErrorResponses: {
          Quantity: 2,
          Items: [
            {
              ErrorCode: 403,
              ResponsePagePath: '/',
              ResponseCode: '200',
            },
            {
              ErrorCode: 404,
              ResponsePagePath: '/',
              ResponseCode: '200',
            },
          ],
        },
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

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      ...pipeline,
      message: 'Distro created',
    })

    return this.cloudfrontClient.send(distroCommand)
  }

  private async createARecord(pipeline: PipelineEntity, frontDomain: string): Promise<string> {
    const ACommand = new ChangeResourceRecordSetsCommand({
      HostedZoneId: process.env.HOSTED_ZONE_ID,
      ChangeBatch: {
        Changes: [
          {
            Action: 'UPSERT',
            ResourceRecordSet: {
              Type: 'A',
              Name: `${pipeline.subDomain}.iaas${process.env.NODE_ENV === 'production' ? '' : '.dev'}.paas.reapit.cloud`,
              AliasTarget: {
                DNSName: frontDomain,
                EvaluateTargetHealth: false,
                HostedZoneId: 'Z2FDTNDATAQYW2',
              },
            },
          },
        ],
        Comment: `Adding additional A record for pipeline [${pipeline.id}] [${
          process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
        }]`,
      },
    })

    const r53Result = await this.route53Client.send(ACommand)

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      ...pipeline,
      message: 'A record created',
    })

    return r53Result.ChangeInfo?.Id as string
  }

  private async failedToDeploy(pipeline: PipelineEntity): Promise<void> {
    pipeline.buildStatus = 'FAILED_TO_PROVISION'
    await Promise.all([
      this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...pipeline,
        message: 'Failed to architect',
      }),
      this.pipelineProvider.update(pipeline, {
        buildStatus: 'FAILED_TO_PROVISION',
      }),
    ])
  }

  private async s3Provision(pipeline: PipelineEntity): Promise<void> {
    await this.s3Provider.upload({
      Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
      Key: `pipeline/${pipeline.uniqueRepoName}/index.html`,
      Body: '<html><body>Deployment required</body></html>',
      Metadata: {
        ['Content-Type']: 'text/html',
      },
    })

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      ...pipeline,
      message: 'Bucket built',
    })
  }
}
