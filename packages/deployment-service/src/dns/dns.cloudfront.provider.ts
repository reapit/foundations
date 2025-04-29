import {
  GetDistributionCommand,
  CloudFrontClient,
  UpdateDistributionCommand,
  Distribution,
  CNAMEAlreadyExists,
} from '@aws-sdk/client-cloudfront'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'

@Injectable()
export class DnsCloudFrontProvider {
  constructor(private readonly cloudfrontClient: CloudFrontClient) {}

  async getCloudFrontDistroDomain(pipeline: PipelineEntity) {
    const result = await this.cloudfrontClient.send(
      new GetDistributionCommand({
        Id: pipeline.cloudFrontId,
      }),
    )

    return result.Distribution?.DomainName
  }

  private async getDistribution(pipeline: PipelineEntity): Promise<[Distribution, string | undefined] | never> {
    const result = await this.cloudfrontClient.send(new GetDistributionCommand({ Id: pipeline.cloudFrontId }))

    if (!result.Distribution) throw new Error(`Distro not found [${pipeline.cloudFrontId}]`)

    return [result.Distribution, result.ETag]
  }

  async updateDistribution(pipeline: PipelineEntity, commonName: string): Promise<void> {
    const [distribution, etag] = await this.getDistribution(pipeline)

    try {
      await this.cloudfrontClient.send(
        new UpdateDistributionCommand({
          ...distribution,
          IfMatch: etag,
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
            // ViewerCertificate: {
            //   ACMCertificateArn: certificateArn,
            //   SSLSupportMethod: 'sni-only',
            //   MinimumProtocolVersion: 'TLSv1.2_2021',
            // },
          },
        }),
      )
    } catch (error) {
      if (!(error instanceof CNAMEAlreadyExists)) throw error

      throw new UnprocessableEntityException('Duplicate domain. Domain in use by cloudfront')
    }
  }
}
