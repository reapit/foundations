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
import { MarketplaceProvider } from '../marketplace'
import { isAxiosError } from 'axios'
import { DevopsPrProvider, DnsRecords } from './devops.pr.provider'

type CertificateCreationEvent = {
  eventName: 'RequestCertificate'
  responseElements: { certificateArn: string }
  requestParameters: { domainName: string }
}
@Injectable()
export class DnsEventBridgeProvider {
  constructor(
    private readonly pipelineProvider: PipelineProvider,
    private readonly cloudfrontClient: CloudFrontClient,
    private readonly pusherProvider: PusherProvider,
    private readonly certificateProvider: CertificateProvider,
    private readonly marketplaceProvider: MarketplaceProvider,
    private readonly devopsPrProvider: DevopsPrProvider,
  ) {}

  private async getPipeline(certificateArn: string): Promise<PipelineEntity | never> {
    const pipeline = await this.pipelineProvider.findByCertificateArn(certificateArn)

    if (!pipeline) throw new Error(`Pipeline not found with certificate ARN [${certificateArn}]`)

    return pipeline
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

  /**
   * Handle certificate creation event
   *
   * - This method will add the signOut and redirectUrls to an existing revision
   * - Create a PR on devops repo to create CNAME records for domain & certificate verification 
   *   if domain matches reapit.cloud
   *
   * @param event
   */
  async handleCertificateCreation(
    event: EventBridgeEvent<'AWS API Call via CloudTrail', CertificateCreationEvent>,
  ): Promise<void> {
    const certificateArn = event.detail.responseElements.certificateArn

    const certificate = await this.certificateProvider.obtainCertificateWithArn(certificateArn)

    const pipeline = await this.getPipeline(certificateArn)

    const [distro] = await this.getDistribution(pipeline)

    const commonName = certificate?.DomainName as string

    try {
      await this.marketplaceProvider.updateAppUrls(pipeline.appId as string, commonName)
    } catch (error) {
      if (isAxiosError(error)) {
        console.log('Failed to create app revision')
        console.error(error)
      } else throw error
    }

    await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
      ...pipeline,
      message: 'DNS updated',
    })

    if (commonName.includes('.reapit.cloud')) {
      const cnames: DnsRecords[] = [
        {
          name: commonName,
          value: (distro.DomainName as string)?.replace('.reapit.cloud', ''),
          type: 'CNAME',
        },
      ]
      certificate?.DomainValidationOptions?.forEach((domain) => {
        if (!domain.ResourceRecord) return

        cnames.push({
          name: (domain.ResourceRecord.Name as string).replace('.reapit.cloud', ''),
          value: domain.ResourceRecord.Value as string,
          type: domain.ResourceRecord.Type as 'CNAME',
        })
      })

      await this.devopsPrProvider.createPR(cnames, pipeline, '')
    }
  }

  /**
   * Handle certificate validation
   *
   * This method is triggered when a certificate has been validated.
   *
   * - update a distro with certificate and custom domain
   * - if domain is already in use, delete certificate and set certificate error against pipeline for frontend
   *
   * @param event
   */
  async handleCertificateValidation(
    event: EventBridgeEvent<'ACM Certificate Available', CertificateDetail>,
  ): Promise<void> {
    const certificateArn = event.resources[0]

    const pipeline = await this.getPipeline(certificateArn)

    const [distro, etag] = await this.getDistribution(pipeline)

    // TODO check certificate status?
    const commonName = event.detail.CommonName

    try {
      // cannot add certificate to distro if certificate is not valid. Needs a different event
      await this.updateDistribution(
        {
          ...distro,
          IfMatch: etag,
        },
        certificateArn,
        commonName,
      )

      const updatedPipeline = await this.pipelineProvider.update(pipeline, {
        certificateStatus: 'complete',
      })
      await this.pusherProvider.trigger(`private-${pipeline.developerId}`, 'pipeline-update', {
        ...updatedPipeline,
        message: 'DNS updated',
      })
    } catch (error) {
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

  private isCertificateCreationEvent(
    event: EventBridgeEvent<
      'ACM Certificate Available' | 'AWS API Call via CloudTrail',
      CertificateDetail | CertificateCreationEvent
    >,
  ): event is EventBridgeEvent<'AWS API Call via CloudTrail', CertificateCreationEvent> {
    return (
      event['detail-type'] === 'AWS API Call via CloudTrail' &&
      Object.prototype.hasOwnProperty.call(event.detail, 'eventName')
    )
  }

  private isCertificateValidationEevent(
    event: EventBridgeEvent<
      'ACM Certificate Available' | 'AWS API Call via CloudTrail',
      CertificateDetail | CertificateCreationEvent
    >,
  ): event is EventBridgeEvent<'ACM Certificate Available', CertificateDetail> {
    return event['detail-type'] === 'ACM Certificate Available' && event.resources.length >= 1
  }

  async handle(
    event: EventBridgeEvent<
      'ACM Certificate Available' | 'AWS API Call via CloudTrail',
      CertificateDetail | CertificateCreationEvent
    >,
  ): Promise<void> {
    if (this.isCertificateCreationEvent(event) && event.detail?.eventName === 'RequestCertificate')
      return this.handleCertificateCreation(event)

    if (this.isCertificateValidationEevent(event)) return this.handleCertificateValidation(event)

    console.log('event not consumable')
  }
}
