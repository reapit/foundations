import {
  CloudFrontClient,
  CNAMEAlreadyExists,
  Distribution,
  GetDistributionCommand,
  UpdateDistributionCommand,
  UpdateDistributionCommandInput,
} from '@aws-sdk/client-cloudfront'
import { Injectable } from '@nestjs/common'
import { PipelineProvider } from '../pipeline'
import { EventBridgeEvent } from 'aws-lambda'
import { CertificateDetail } from '../dns-eventbridge'
import { PusherProvider } from '../events'
import { PipelineEntity } from '../entities/pipeline.entity'
import { CertificateProvider } from './certificate.provider'

@Injectable()
export class DnsEventBridgeProvider {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly cloudfrontClient: CloudFrontClient,
    private readonly pusherProvider: PusherProvider,
    private readonly certificateProvider: CertificateProvider,
  ) {}

  private async getPipeline(certificateArn: string): Promise<PipelineEntity | never> {
    const pipeline = await this.pipelineProvider.findByCertificateArn(certificateArn)

    if (!pipeline) throw new Error(`Pipeline not found with certificate ARN [${certificateArn}]`)

    return pipeline
  }

  private getCertifcateArn(event: EventBridgeEvent<'ACM Certificate Available', CertificateDetail>): string | never {
    if (!event.resources || event.resources.length === 0) throw new Error('Certificate had no ARN')

    return event.resources[0]
  }

  private async getDistribution(pipeline: PipelineEntity): Promise<[Distribution, string | undefined] | never> {
    const result = await this.cloudfrontClient.send(new GetDistributionCommand({ Id: pipeline.cloudFrontId }))

    if (!result.Distribution) throw new Error(`Distro not found [${pipeline.cloudFrontId}]`)

    return [result.Distribution, result.ETag]
  }

  private async updateDistribution(
    distribution: UpdateDistributionCommandInput,
    certificateArn: string,
    commonName: string,
  ): Promise<void> {
    await this.cloudfrontClient.send(
      new UpdateDistributionCommand({
        ...distribution,
        DistributionConfig: {
          ...distribution.DistributionConfig,
          PriceClass: distribution.DistributionConfig?.PriceClass,
          CallerReference: distribution.DistributionConfig?.CallerReference,
          Aliases: {
            Quantity: 2,
            Items: [...(distribution.DistributionConfig?.Aliases?.Items || []), commonName],
          },
          Origins: distribution.DistributionConfig?.Origins,
          Comment: distribution.DistributionConfig?.Comment,
          DefaultCacheBehavior: distribution.DistributionConfig?.DefaultCacheBehavior,
          Enabled: distribution.DistributionConfig?.Enabled,
          ViewerCertificate: {
            ACMCertificateArn: certificateArn,
            SSLSupportMethod: 'sni-only',
            MinimumProtocolVersion: 'TLSv1.2_2021',
          },
        },
      }),
    )
  }

  async handle(event: EventBridgeEvent<'ACM Certificate Available', CertificateDetail>): Promise<void> {
    const certificateArn = this.getCertifcateArn(event)
    const commonName = event.detail.CommonName

    const pipeline = await this.getPipeline(certificateArn)

    if (pipeline?.certificateStatus === 'complete') return

    const [distro, etag] = await this.getDistribution(pipeline)

    try {
      await this.updateDistribution(
        {
          ...distro,
          IfMatch: etag,
        },
        certificateArn,
        commonName,
      )

      await this.pipelineProvider.update(pipeline, {
        certificateStatus: 'complete',
      })

      await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...pipeline,
        message: 'DNS updated',
      })
    } catch (error: any) {
      console.error(error)
      if (!(error instanceof CNAMEAlreadyExists)) throw error
      await this.certificateProvider.deleteCertificate(pipeline)
      const updatedPipeline = await this.pipelineProvider.update(pipeline, {
        // @ts-ignore
        certificateArn: null,
        // @ts-ignore
        customDomain: null,
        domainVerified: false,
        // @ts-ignore
        verifyDnsValue: null,
        certificateStatus: 'unverified',
        certificateError: `Domain [${pipeline.customDomain}] has already been configured.`,
      })

      await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...updatedPipeline,
        message: 'DNS updated',
      })
    }
  }
}
