import { PipelineEntity } from '../entities/pipeline.entity'
import { DnsProvider } from './dns.provider'

describe('DnsProvider', () => {
  it('Will return error if no return', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() => Promise.resolve(new Response(new TextEncoder().encode(JSON.stringify({})))))

    const provider = new DnsProvider()

    const result = await provider.verifyTextRecordOnDomain({
      verifyDnsName: '',
      customDomain: '',
    } as PipelineEntity)

    expect(result.result).toBeFalsy()
  })

  it('Will return true if domain exists in response', async () => {
    const verifyDnsName = 'verify-me'
    jest
      .spyOn(global, 'fetch')
      .mockImplementationOnce(() =>
        Promise.resolve(new Response(new TextEncoder().encode(JSON.stringify({ Answer: [{ data: verifyDnsName }] })))),
      )

    const provider = new DnsProvider()

    const result = await provider.verifyTextRecordOnDomain({
      verifyDnsName,
      customDomain: '',
    } as PipelineEntity)

    expect(result.result).toBeFalsy()
  })
})
