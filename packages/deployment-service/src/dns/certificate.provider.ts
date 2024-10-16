import { ACMClient, RequestCertificateCommand } from '@aws-sdk/client-acm'
import { PipelineEntity } from './../entities/pipeline.entity'

export class CertificateProvider {
  constructor(
    private readonly client: ACMClient,
  ) {}

  async createCertificate(pipeline: PipelineEntity): Promise<string> {
    const result = await this.client.send(new RequestCertificateCommand({
      DomainName: pipeline.customDomain,
      ValidationMethod: "DNS",
      SubjectAlternativeNames: [
        `www.${pipeline.customDomain}`, // if www is required?
      ],
      DomainValidationOptions: [{
        DomainName: pipeline.customDomain,
        ValidationDomain: "STRING_VALUE", // for sending email to about the cert, perhaps to reapit?
      }],
      Options: {
        CertificateTransparencyLoggingPreference: "ENABLED",
      },
      Tags: [
        {
          Key: "pipelineId",
          Value: pipeline.id,
        },
        {
          Key: 'onwer',
          Value: 'IaaS',
        },
      ],
    }))

    return result.CertificateArn as string
  }
}
