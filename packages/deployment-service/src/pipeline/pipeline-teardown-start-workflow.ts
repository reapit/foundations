import { QueueNamesEnum } from '../constants'
import { Workflow, AbstractWorkflow, SqsProvider, EventDispatcher } from '../events'
import {
  CloudFrontClient,
  DistributionConfig,
  GetDistributionCommand,
  UpdateDistributionCommand,
} from '@aws-sdk/client-cloudfront'
import { PipelineProvider } from './pipeline-provider'
import { PipelineEntity } from '../entities/pipeline.entity'

@Workflow(QueueNamesEnum.PIPELINE_TEAR_DOWN_START, () => PipelineEntity)
export class PipelineTearDownStartWorkflow extends AbstractWorkflow<PipelineEntity> {
  constructor(
    sqsProvider: SqsProvider,
    private readonly pipelineProvider: PipelineProvider,
    private readonly eventDispatcher: EventDispatcher,
    private readonly cloudfrontClient: CloudFrontClient,
  ) {
    super(sqsProvider)
  }

  private async disableCloudFront(Id: string) {
    const cloudFrontDistro = await this.cloudfrontClient.send(
      new GetDistributionCommand({
        Id,
      }),
    )

    const config = cloudFrontDistro.Distribution?.DistributionConfig as DistributionConfig

    return this.cloudfrontClient.send(
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

  async execute(pipeline: PipelineEntity) {
    if (pipeline.buildStatus !== 'PRE_PROVISIONED' && pipeline.hasDistro)
      console.log('disable result', await this.disableCloudFront(pipeline.cloudFrontId as string))

    await Promise.all([
      this.pipelineProvider.update(pipeline, {
        buildStatus: 'SCHEDULED_FOR_DELETION',
      }),
      this.eventDispatcher.triggerPipelineTearDown(pipeline),
      this.deleteMessage(),
    ])
  }
}
