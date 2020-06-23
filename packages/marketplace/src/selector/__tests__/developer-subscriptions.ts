import { ReduxState } from '@/types/core'
import { subscriptionModelStub, listSubscriptionsStub } from '@/sagas/__stubs__/developer-subscriptions'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectSubscriptions,
  selectSubscriptionsLoading,
} from '../developer-subscriptions'
import appState from '@/reducers/__stubs__/app-state'

describe('DeveloperSubscription', () => {
  const mockState = {
    ...appState,
    developerSubscriptions: {
      create: {
        loading: false,
        subscription: subscriptionModelStub,
      },
      list: {
        loading: false,
        data: listSubscriptionsStub,
      },
    },
  } as ReduxState

  describe('selectCreateDeveloperSubscriptionLoading', () => {
    it('should run correctly', () => {
      const output = selectCreateDeveloperSubscriptionLoading(mockState)
      expect(output).toEqual(mockState.developerSubscriptions.create.loading)
    })
  })

  describe('selectSubscriptions', () => {
    it('should run correctly', () => {
      const result = selectSubscriptions(mockState)
      expect(result).toEqual(mockState.developerSubscriptions.list.data)
    })
  })

  describe('selectSubscriptionsLoading', () => {
    it('should run correctly', () => {
      const result = selectSubscriptionsLoading(mockState)
      expect(result).toEqual(false)
    })
  })
})
