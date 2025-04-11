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
import { DnsCloudFrontProvider } from './dns.cloudfront.provider'

@Controller('dns')
@UseGuards(IdTokenGuard)
export class DnsController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly dnsProvider: DnsProvider,
    private readonly certificateProvider: CertificateProvider,
    private readonly cloudFrontProvider: DnsCloudFrontProvider,
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

    const verifyDnsName = 'reapit-iaas'
    const verifyDnsValue = uuid()

    await this.pipelineProvider.update(pipeline, {
      customDomain: body.customDomain, // TODO should strip everything not a domain? query params example
      verifyDnsValue,
      verifyDnsName,
    })

    return { verifyDnsValue }
  }

  @Post(':pipelineId/verify')
  async verifyRecord(@Param('pipelineId') pipelineId: string, @Creds() creds: LoginIdentity) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (pipeline.domainVerified) throw new UnprocessableEntityException('Domain already verified')

    const { result: domainVerified, reason } = await this.dnsProvider.verifyTextRecordOnDomain(pipeline)

    if (typeof domainVerified === 'boolean' && domainVerified) {
      await this.pipelineProvider.update(pipeline, {
        domainVerified: true,
        certificateArn: await this.certificateProvider.createCertificate(pipeline),
        certificateStatus: 'pending',
        // @ts-ignore
        certificateError: null,
      })

      return {
        result: 'success',
      }
    }

    return {
      result: domainVerified ? 'success' : 'failed',
      reason,
    }
  }

  @Get(':pipelineId/certificate')
  async describeCertificate(@Param('pipelineId') pipelineId: string, @Creds() creds: LoginIdentity) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (!pipeline.domainVerified) throw new UnprocessableEntityException()

    const certificate = await this.certificateProvider.obtainCertificate(pipeline)

    if (!certificate) throw new NotFoundException()

    // TODO serialise
    return certificate
  }

  @Get(':pipelineId/cloudFrontCname')
  async getCloudFrontCname(@Param('pipelineId') pipelineId: string, @Creds() creds: LoginIdentity) {
    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    if (!pipeline.domainVerified) throw new UnprocessableEntityException('Domain not verified')

    if (pipeline.certificateStatus !== 'complete') throw new UnprocessableEntityException('Certificate not appoved')

    return this.cloudFrontProvider.getCloudFrontDistro(pipeline)
  }
}
