import {
  ACMClient,
  CertificateDetail,
  DescribeCertificateCommand,
  RequestCertificateCommand,
  ResourceNotFoundException,
} from '@aws-sdk/client-acm'
import { PipelineEntity } from './../entities/pipeline.entity'
import { Inject } from '@nestjs/common'

export class CertificateProvider {
  constructor(
    @Inject(ACMClient)
    private readonly client: ACMClient,
  ) {}

  async createCertificate(pipeline: PipelineEntity): Promise<string> {
    // TODO needs to be created in iaas account? Probably does
    const result = await this.client.send(
      new RequestCertificateCommand({
        DomainName: pipeline.customDomain,
        ValidationMethod: 'DNS',
        SubjectAlternativeNames: [
          // `www.${pipeline.customDomain}`, // if www is required?
          pipeline.customDomain as string,
          `*.${pipeline.customDomain}`,
        ],
        DomainValidationOptions: [
          {
            DomainName: `*.${pipeline.customDomain}`,
            ValidationDomain: pipeline.customDomain, // for sending email to about the cert, perhaps to reapit?
          },
        ],
        Options: {
          CertificateTransparencyLoggingPreference: 'ENABLED',
        },
        Tags: [
          {
            Key: 'pipelineId',
            Value: pipeline.id,
          },
          {
            Key: 'onwer',
            Value: 'IaaS',
          },
        ],
      }),
    )

    return result.CertificateArn as string
  }

  async obtainCertificate(pipeline: PipelineEntity): Promise<CertificateDetail | undefined> {
    if (!pipeline.certificateArn) return undefined

    try {
      const certificate = await this.client.send(
        new DescribeCertificateCommand({
          CertificateArn: pipeline.certificateArn,
        }),
      )

      return certificate.Certificate
    } catch (error: any) {
      if (error instanceof ResourceNotFoundException) {
        console.error(error.message)
        return undefined
      }
    }
  }
}
