import { fetcher } from '@reapit/utils-common'
import { fetchTrafficStatistics } from '../traffic-statistics'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react', () => ({
  getPlatformHeaders: jest.fn(() => ({})),
}))

const mockedFetch = fetcher as jest.Mock

describe('traffic statistics services', () => {
  describe('fetchTrafficStatistics', () => {
    it('should return a response from the traffic statistics service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchTrafficStatistics({})).toEqual(stub)
    })
  })
})
