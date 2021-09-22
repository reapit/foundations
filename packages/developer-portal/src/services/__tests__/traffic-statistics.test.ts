import { fetcher } from '@reapit/elements-legacy'
import { fetchTrafficStatistics } from '../traffic-statistics'

jest.mock('@reapit/elements-legacy')
jest.mock('@reapit/utils')

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
