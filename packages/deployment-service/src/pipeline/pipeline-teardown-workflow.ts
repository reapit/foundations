import { QueueNamesEnum } from '../constants'
import { S3Provider } from '../s3'
import { Workflow, AbstractWorkflow, SqsProvider, PusherProvider } from '../events'
import { CloudFrontClient, DeleteDistributionCommand, GetDistributionCommand } from '@aws-sdk/client-cloudfront'
import { ChangeResourceRecordSetsCommand, Route53Client } from '@aws-sdk/client-route-53'
import { PipelineEntity } from '../entities/pipeline.entity'
import { PipelineProvider } from './pipeline-provider'
import { PipelineRunnerProvider, TaskProvider } from '../pipeline-runner'
import { ParameterProvider } from './parameter-provider'

@Workflow(QueueNamesEnum.PIPELINE_TEAR_DOWN, () => PipelineEntity)
export class PipelineTearDownWorkflow extends AbstractWorkflow<PipelineEntity> {
  constructor(
    private readonly s3Provider: S3Provider,
    sqsProvider: SqsProvider,
    private readonly pusherProvider: PusherProvider,
    private readonly pipelineProvider: PipelineProvider,
    private readonly taskProvider: TaskProvider,
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    private readonly parameterProvider: ParameterProvider,
    private readonly cloudfrontClient: CloudFrontClient,
    private readonly route53Client: Route53Client,
  ) {
    super(sqsProvider)
  }

  private tearDownLiveBucketLocation = (location: string): Promise<void> => {
    return this.s3Provider.deleteObject({
      Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
      Key: location,
    })
  }

  private tearDownR53 = (domain: string, pipelineId: string, subDomain: string): Promise<any> => {
    return this.route53Client.send(
      new ChangeResourceRecordSetsCommand({
        HostedZoneId: process.env.HOSTED_ZONE_ID,
        ChangeBatch: {
          Changes: [
            {
              Action: 'DELETE',
              ResourceRecordSet: {
                Type: 'A',
                Name: `${subDomain}.iaas.paas.reapit.cloud`,
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

  private deleteAllFromDb = async (pipeline: PipelineEntity) => {
    await this.taskProvider.deleteForPipeline(pipeline)
    await this.pipelineRunnerProvider.deleteForPipeline(pipeline)
    await this.pipelineProvider.delete(pipeline)
  }

  private tearDownCloudFront = async (Id: string): Promise<string> => {
    const cloudFrontDistro = await this.cloudfrontClient.send(
      new GetDistributionCommand({
        Id,
      }),
    )

    await this.cloudfrontClient.send(
      new DeleteDistributionCommand({
        Id,
        IfMatch: cloudFrontDistro.ETag,
      }),
    )

    return cloudFrontDistro.Distribution?.DomainName as string
  }

  // TODO add try catch for failure results
  async execute(pipeline: PipelineEntity) {
    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      ...pipeline,
      buildStatus: 'DELETING',
    })
    if (pipeline.buildStatus !== 'PRE_PROVISIONED') {
      await this.tearDownLiveBucketLocation(`pipeline/${pipeline.uniqueRepoName}`)

      if (pipeline.hasDistro) {
        const domainName = await this.tearDownCloudFront(pipeline.cloudFrontId as string)

        if (pipeline.hasRoute53) await this.tearDownR53(domainName, pipeline.id as string, pipeline.subDomain as string)
      }
    }

    await this.parameterProvider.destroyParameters(pipeline.id as string)

    await this.deleteAllFromDb(pipeline)
    pipeline.buildStatus = 'DELETED'
    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', pipeline)
    await this.deleteMessage()
  }
}
