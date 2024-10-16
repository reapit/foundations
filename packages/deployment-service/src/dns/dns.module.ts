import { Module } from '@nestjs/common'
import { DnsProvider } from './dns.provider'
import { DnsController } from './dns.controller'
import { Route53Client } from '@aws-sdk/client-route-53'
import { CertificateProvider } from './certificate.provider'
import { ACMClient } from '@aws-sdk/client-acm'

@Module({
  providers: [
    {
      provide: Route53Client,
      useFactory: () => new Route53Client({}),
    },
    {
      provide: ACMClient,
      useFactory: () => new ACMClient,
    },
    DnsProvider,
    CertificateProvider,
  ],
  controllers: [
    DnsController,
  ],
})
export class DnsModule {}
