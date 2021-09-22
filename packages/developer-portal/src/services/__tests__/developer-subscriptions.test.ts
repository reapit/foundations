import { fetcher } from '@reapit/elements-legacy'
import { createDeveloperSubscription, deleteSubscription, fetchSubscriptionsList } from '../developer-subscriptions'

jest.mock('@reapit/elements-legacy')
jest.mock('@reapit/utils')

const mockedFetch = fetcher as jest.Mock

describe('developer subscriptions services', () => {
  describe('fetchSubscriptionsList', () => {
    it('should return a response from the developer subscriptions service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await fetchSubscriptionsList({ developerId: 'SOME_ID' })).toEqual(stub)
    })
  })

  describe('createDeveloperSubscription', () => {
    it('should return a response from the developer subscriptions service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await createDeveloperSubscription({})).toEqual(stub)
    })
  })

  describe('deleteSubscription', () => {
    it('should return a response from the developer subscriptions service', async () => {
      const stub = { someKey: 'some value' }
      mockedFetch.mockReturnValueOnce(stub)
      expect(await deleteSubscription({ id: 'SOME_ID' })).toEqual(stub)
    })
  })
})
