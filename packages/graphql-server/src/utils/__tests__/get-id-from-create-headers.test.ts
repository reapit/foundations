import { getIdFromCreateHeaders } from '../get-id-from-create-headers'

describe('getIdFromCreateHeaders', () => {
  it('should return id', () => {
    const headers = {
      date: 'Thu, 12 Mar 2020 07:38:57 GMT',
      'content-type': 'application/json',
      'content-length': '0',
      connection: 'close',
      'x-amzn-requestid': 'bd8f2cc2-19cd-4b65-8cd2-b0567bb4e915',
      'x-amzn-remapped-content-length': '0',
      'x-amzn-remapped-connection': 'keep-alive',
      'x-amz-apigw-id': 'JREKsGVOLPEFcEw=',
      'x-amzn-remapped-server': 'Kestrel',
      location: 'https://dev.platform.reapit.cloud/areas/PRL',
      'x-amzn-remapped-date': 'Thu, 12 Mar 2020 07:38:57 GMT',
    }
    const result = getIdFromCreateHeaders({ headers })
    expect(result).toEqual('PRL')
  })

  it('should return undefined', () => {
    const headers = null
    const result = getIdFromCreateHeaders({ headers })
    expect(result).toEqual(undefined)
  })

  it('should return undefined', () => {
    const headers = {
      location: null,
    }
    const result = getIdFromCreateHeaders({ headers })
    expect(result).toEqual(undefined)
  })

  it('should return undefined', () => {
    const headers = {
      location: '',
    }
    const result = getIdFromCreateHeaders({ headers })
    expect(result).toEqual(undefined)
  })
})
