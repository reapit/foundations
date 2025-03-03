import { NestFactory } from '@nestjs/core'
import { AppModule } from './app-module'
import { EventBridgeHandler } from 'aws-lambda'
import { INestMicroservice } from '@nestjs/common'
import { DnsEventBridgeProvider } from './dns/dns.eventbridge.provider'

let app: INestMicroservice

export type CertificateDetail = {
  CertificateType: string
  CommonName: string
  DomainValidationMethod: string
  Action: string
  DaysToExpiry: number
  CertificateCreatedDate: string
  CertificateExpirationDate: string
  InUse: false
  Exported: false
}

const initApp = async (): Promise<INestMicroservice> => {
  const app = await NestFactory.createMicroservice<INestMicroservice>(AppModule)
  await app.init()

  return app
}

export const handle: EventBridgeHandler<'ACM Certificate Available', CertificateDetail, any> = async (event) => {
  app = app || (await initApp())

  console.log('event', JSON.stringify(event))

  const dnsEventBridgeProvider = app.get<DnsEventBridgeProvider>(DnsEventBridgeProvider)

  await dnsEventBridgeProvider.handle(event)
}
