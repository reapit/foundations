import { getClientHeaders } from '../get-client-headers'

describe('getClientHeaders', () => {
  it('should return the correct headers', () => {
    const apiKey = 'SOME_KEY'
    const customerId = 'DEMO'
    const expected = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'reapit-customer': customerId,
    }
    expect(getClientHeaders({ apiKey, customerId })).toEqual(expected)
  })
})
