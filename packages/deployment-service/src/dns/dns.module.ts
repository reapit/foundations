import { Module } from '@nestjs/common'
import { DnsProvider } from './dns.provider'
import { DnsController } from './dns.controller'
import { Route53Client } from '@aws-sdk/client-route-53'
import { CertificateProvider } from './certificate.provider'
import { PipelineModule } from '../pipeline'
import { AwsModule } from '../aws'

@Module({
  imports: [PipelineModule, AwsModule],
  providers: [
    {
      provide: Route53Client,
      useFactory: () => new Route53Client({}),
    },
    DnsProvider,
    CertificateProvider,
  ],
  controllers: [DnsController],
})
export class DnsModule {}
