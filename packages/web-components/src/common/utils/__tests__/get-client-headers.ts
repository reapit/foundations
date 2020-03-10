import { DEFAULT_HEADERS } from '../constants'
import { getClientHeaders } from '../get-client-headers'

describe('getClientHeaders', () => {
  it('should return the correct headers', () => {
    const apiKey = 'SOME_KEY'
    const expected = {
      ...DEFAULT_HEADERS,
      'x-api-key': apiKey,
    }
    expect(getClientHeaders(apiKey)).toEqual(expected)
  })
})
