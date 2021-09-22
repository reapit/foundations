import { fetcher } from '@reapit/elements-legacy'
import { fetchNegotiators } from '../negotiators'

jest.mock('@reapit/elements-legacy')
jest.mock('@reapit/utils')

const mockedFetch = fetcher as jest.Mock

describe('negotiators services', () => {
  describe('fetchNegotiators', () => {
    it('should return a response from the negotiators service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchNegotiators({})).toEqual(stub)
    })
  })
})
