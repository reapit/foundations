import { fetcher } from '@reapit/utils-common'
import { fetchScopeListAPI } from '../scopes'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react')

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
