import { fetcher } from '@reapit/elements-legacy'
import { fetchScopeListAPI } from '../scopes'

jest.mock('@reapit/elements-legacy')
jest.mock('@reapit/utils')

const mockedFetch = fetcher as jest.Mock

describe('scopes services', () => {
  describe('fetchScopeListAPI', () => {
    it('should return a response from the scopes service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchScopeListAPI()).toEqual(stub)
    })
  })
})
