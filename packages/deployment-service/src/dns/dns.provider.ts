import { PipelineEntity } from './../entities/pipeline.entity'
// import { Route53Client, ChangeResourceRecordSetsCommand } from '@aws-sdk/client-route-53'

export class DnsProvider {
  constructor() {} // private readonly client: Route53Client,

  /**
   * Uses https://developers.google.com/speed/public-dns/docs/doh/json
   * to resolve TXT records
   *
   * @param pipeline
   */
  async verifyTextRecordOnDomain(pipeline: PipelineEntity): Promise<{
    result: boolean
    reason?: string
  }> {
    const response = await fetch(
      `https://dns.google/resolve?name=${pipeline.verifyDnsName}.${pipeline.customDomain}&type=16`,
    )

    const data = (await response.json()) as { Answer?: { data: string }[] }

    if (!data.Answer) return { result: false, reason: 'No defined TXT records for domain' }

    const txtRecord = data.Answer.some((record) => record.data === pipeline.verifyDnsValue)

    return !txtRecord ? { result: false, reason: 'TXT record not defined' } : { result: true }
  }
}
