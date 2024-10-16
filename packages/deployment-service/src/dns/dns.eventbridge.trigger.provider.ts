import { DnsProvider } from "./dns.provider";
import { PipelineProvider } from '../pipeline'
import { CertificateProvider } from "./certificate.provider";

export class DnsEventBridgeTriggerProvider {
  constructor(
    private readonly dnsProvider: DnsProvider,
    private readonly pipelineProvider: PipelineProvider,
    private readonly certificateProvider: CertificateProvider,
  ) {}

  async validateCertificateDomain(pipelineId: string) {
    
    // TODO notify developer of certificate creation?
  }
}
