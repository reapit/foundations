import { fetcher } from '@reapit/elements-legacy'
import { fetchStatisticsList } from '../statistics'

jest.mock('@reapit/elements-legacy')
jest.mock('@reapit/utils')

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
