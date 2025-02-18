import { CloudFrontClient, GetDistributionCommand, UpdateDistributionCommand } from '@aws-sdk/client-cloudfront'
import { Injectable } from '@nestjs/common'
import { PipelineProvider } from '../pipeline'
import { EventBridgeEvent } from 'aws-lambda'
import { CertificateDetail } from '../dns-eventbridge'
import { PusherProvider } from '../events'

@Injectable()
export class DnsEventBridgeProvider {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly cloudfrontClient: CloudFrontClient,
    private readonly pusherProvider: PusherProvider,
  ) {}

  async handle(event: EventBridgeEvent<'ACM Certificate Available', CertificateDetail>): Promise<void> {
    if (!event.resources || event.resources.length === 0) throw new Error('Certificate had no ARN')
    const pipeline = await this.pipelineProvider.findByCertificateArn(event.resources[0])

    if (!pipeline) throw new Error(`Pipeline not found with certificate ARN [${event.resources.join(', ')}]`)

    if (pipeline?.certificateStatus === 'complete') return

    const distroResult = await this.cloudfrontClient.send(
      new GetDistributionCommand({
        Id: pipeline.cloudFrontId,
      }),
    )

    const distro = distroResult.Distribution

    if (!distro) throw new Error(`Distro not found [${pipeline.cloudFrontId}]`)

    await this.cloudfrontClient.send(
      new UpdateDistributionCommand({
        ...distro,
        DistributionConfig: {
          ...distro.DistributionConfig,
          PriceClass: distro.DistributionConfig?.PriceClass,
          CallerReference: distro.DistributionConfig?.CallerReference,
          Aliases: {
            Quantity: 2,
            Items: [...(distro.DistributionConfig?.Aliases?.Items || []), event.detail.CommonName],
          },
          Origins: distro.DistributionConfig?.Origins,
          Comment: distro.DistributionConfig?.Comment,
          DefaultCacheBehavior: distro.DistributionConfig?.DefaultCacheBehavior,
          Enabled: distro.DistributionConfig?.Enabled,
          ViewerCertificate: {
            ACMCertificateArn: event.resources[0],
            SSLSupportMethod: 'sni-only',
            MinimumProtocolVersion: 'TLSv1.2_2021',
          },
        },
        IfMatch: distroResult.ETag,
      }),
    )

    await this.pipelineProvider.update(pipeline, {
      certificateStatus: 'complete',
    })

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      ...pipeline,
      message: 'DNS updated',
    })
  }
}
