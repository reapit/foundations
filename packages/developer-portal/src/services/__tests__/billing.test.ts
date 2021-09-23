import { fetcher } from '@reapit/elements-legacy'
import { fetchBillings, fetchBillingsByMonth } from '../billing'

jest.mock('@reapit/elements-legacy')
jest.mock('@reapit/utils')

const mockedFetch = fetcher as jest.Mock

describe('billing services', () => {
  describe('fetchBillings', () => {
    it('should return a response from the billing service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchBillings({})).toEqual(stub)
    })
  })

  describe('fetchBillingsByMonth', () => {
    it('should return a response from the billing service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchBillingsByMonth({ month: 'SOME_MONTH' })).toEqual(stub)
    })
  })
})
