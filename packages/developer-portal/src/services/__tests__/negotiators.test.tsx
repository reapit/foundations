import { fetcher } from '@reapit/utils-common'
import { fetchNegotiators } from '../negotiators'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react')

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
