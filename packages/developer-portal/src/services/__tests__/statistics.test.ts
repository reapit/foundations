import { fetcher } from '@reapit/utils-common'
import { fetchStatisticsList } from '../statistics'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react', () => ({
  getPlatformHeaders: jest.fn(() => ({})),
}))

const mockedFetch = fetcher as jest.Mock

describe('statistics services', () => {
  describe('fetchStatisticsList', () => {
    it('should return a response from the statistics service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchStatisticsList({})).toEqual(stub)
    })
  })
})
