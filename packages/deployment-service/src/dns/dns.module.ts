import { Module } from '@nestjs/common'
import { DnsController } from './dns.controller'
import { Route53Client } from '@aws-sdk/client-route-53'
import { CertificateProvider } from './certificate.provider'
import { PipelineModule } from '../pipeline'
import { AwsModule } from '../aws'
import { DnsEventBridgeProvider } from './dns.eventbridge.provider'
import { EventModule } from '../events'
import { DnsCloudFrontProvider } from './dns.cloudfront.provider'
import { MarketplaceModule } from '../marketplace'

@Module({
  imports: [PipelineModule, AwsModule, EventModule, MarketplaceModule],
  providers: [
    {
      provide: Route53Client,
      useFactory: () => new Route53Client({}),
    },
    CertificateProvider,
    DnsEventBridgeProvider,
    DnsCloudFrontProvider,
  ],
  controllers: [DnsController],
  exports: [DnsEventBridgeProvider],
})
export class DnsModule {}
