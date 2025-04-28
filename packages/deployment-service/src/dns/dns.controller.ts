import {
  Controller,
  UseGuards,
  Post,
  Param,
  NotFoundException,
  Body,
  Get,
  ForbiddenException,
  UnprocessableEntityException,
} from '@nestjs/common'
import { Creds, IdTokenGuard, OwnershipProvider } from '@reapit/utils-nest'
import { PipelineProvider } from './../pipeline'
import { CreateDnsModel } from './dns.model'
import { CertificateProvider } from './certificate.provider'
import { LoginIdentity } from '@reapit/connect-session-server'
import { DnsCloudFrontProvider } from './dns.cloudfront.provider'

@Controller('dns')
@UseGuards(IdTokenGuard)
export class DnsController {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly ownershipProvider: OwnershipProvider,
    private readonly certificateProvider: CertificateProvider,
    private readonly cloudFrontProvider: DnsCloudFrontProvider,
  ) {}

  @Post(':pipelineId')
  async createDnsRecord(
    @Param('pipelineId') pipelineId: string,
    @Body() body: CreateDnsModel,
    @Creds() creds: LoginIdentity,
  ) {
    if (!creds.groups.includes('FoundationsDeveloperAdmin')) throw new ForbiddenException()

    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    const existingCertificate = await this.certificateProvider.obtainCertificate(pipeline)

    if (existingCertificate) throw new UnprocessableEntityException()

    const certificateArn = await this.certificateProvider.createCertificate(pipeline, body.customDomain)
    const cloudfrontUrl = await this.cloudFrontProvider.getCloudFrontDistro(pipeline)

    await this.pipelineProvider.update(pipeline, {
      customDomain: body.customDomain, // TODO should strip everything not a domain? query params example
      certificateArn,
    })

    return {
      cloudfrontUrl,
      customDomain: body.customDomain,
    }
  }

  @Get(':pipelineId')
  async getDnsRecordInfo(@Param('pipelineId') pipelineId: string, @Creds() creds: LoginIdentity) {
    if (!creds.groups.includes('FoundationsDeveloperAdmin')) throw new ForbiddenException()

    const pipeline = await this.pipelineProvider.findById(pipelineId)

    if (!pipeline) throw NotFoundException

    console.log('pipeline', pipeline)

    this.ownershipProvider.check(pipeline, creds.developerId as string)

    const certificate = await this.certificateProvider.obtainCertificate(pipeline)
    const cloudfrontUrl = await this.cloudFrontProvider.getCloudFrontDistro(pipeline)

    console.log(certificate)

    if (!certificate) throw new NotFoundException()

    return {
      cloudfrontUrl,
      // TODO serialise
      certificate,
      customDomain: pipeline.customDomain,
    }
  }
}
