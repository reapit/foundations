import {
  Controller,
  UseGuards,
  Post,
  Get,
  Param,
  NotFoundException,
  UnprocessableEntityException,
  Body,
} from '@nestjs/common'
import { Creds, IdTokenGuard, OwnershipProvider } from '@reapit/utils-nest'
import { PipelineProvider } from './../pipeline'
import { v4 as uuid } from 'uuid'
import { CreateDnsModel } from './dns.model'
import { DnsProvider } from './dns.provider'
import { CertificateProvider } from './certificate.provider'
import { LoginIdentity } from '@reapit/connect-session-server'

@Controller('dns')
@UseGuards(IdTokenGuard)
export class DnsController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly dnsProvider: DnsProvider,
    private readonly certificateProvider: CertificateProvider,
  ) {}

  @Post(':pipelineId')
  async createDnsRecord(
    @Param('pipelineId') pipelineId: string,
    @Body() body: CreateDnsModel,
    @Creds() creds: LoginIdentity,
  ) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    // prevent verify value overwrite
    // perhaps should be overwritable incase of mistake
    if (pipeline.verifyDnsValue !== undefined) throw new UnprocessableEntityException('Record already generated')

    await this.pipelineProvider.update(pipeline, {
      verifyDnsName: 'anything',
      customDomain: body.customDomain, // TODO should strip everything not a domain? query params example
      verifyDnsValue: uuid(),
    })

    return pipeline.verifyDnsValue
  }

  @Post(':pipelineId/verify')
  async verifyRecord(@Param('pipelineId') pipelineId: string, @Creds() creds: LoginIdentity) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (pipeline.domainVerified) throw new UnprocessableEntityException('Domain already verified')

    const domainVerified = await this.dnsProvider.verifyTextRecordOnDomain(pipeline)

    if (domainVerified) {
      await this.pipelineProvider.update(pipeline, {
        domainVerified: true,
        certificateArn: await this.certificateProvider.createCertificate(pipeline),
      })

      return {
        success: true,
      }
    }

    return {
      failed: true,
    }
  }
}
