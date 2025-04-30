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
}
