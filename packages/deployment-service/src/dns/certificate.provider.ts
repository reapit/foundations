import {
  ACMClient,
  CertificateDetail,
  DeleteCertificateCommand,
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

  async createCertificate(pipeline: PipelineEntity, customDomain: string): Promise<string> {
    const result = await this.client.send(
      new RequestCertificateCommand({
        DomainName: customDomain,
        ValidationMethod: 'DNS',
        SubjectAlternativeNames: [
          // `www.${pipeline.customDomain}`, // if www is required?
          customDomain as string,
        ],
        DomainValidationOptions: [
          {
            DomainName: customDomain,
            ValidationDomain: customDomain,
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

  async obtainCertificateWithArn(CertificateArn: string) {
    try {
      const certificate = await this.client.send(
        new DescribeCertificateCommand({
          CertificateArn,
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

  async deleteCertificate(pipeline: PipelineEntity): Promise<void> {
    if (!pipeline.certificateArn) return

    await this.client.send(
      new DeleteCertificateCommand({
        CertificateArn: pipeline.certificateArn,
      }),
    )
  }
}
