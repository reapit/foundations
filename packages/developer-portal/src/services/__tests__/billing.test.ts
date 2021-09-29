import { fetcher } from '@reapit/utils-common'
import { fetchBillings, fetchBillingsByMonth } from '../billing'

jest.mock('@reapit/utils-common')
jest.mock('@reapit/utils-react')

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
