import { ReduxState } from '@/types/core'
import { listSubscriptionsStub } from '@/sagas/__stubs__/developer-subscriptions'
import {
  selectCreateDeveloperSubscriptionLoading,
  selectCreateDeveloperSubscriptionError,
  selectSubscriptions,
  selectSubscriptionsLoading,
} from '../developer-subscriptions'
import appState from '@/reducers/__stubs__/app-state'

describe('DeveloperSubscription', () => {
  const mockState = {
    ...appState,
    developerSubscriptions: {
      create: {
        isLoading: false,
        error: false,
      },
      list: {
        isLoading: false,
        data: listSubscriptionsStub,
      },
    },
  } as ReduxState

  describe('selectCreateDeveloperSubscriptionLoading', () => {
    it('should run correctly', () => {
      const output = selectCreateDeveloperSubscriptionLoading(mockState)
      expect(output).toEqual(mockState.developerSubscriptions.create.isLoading)
    })
  })

  describe('selectCreateDeveloperSubscriptionError', () => {
    it('should run correctly', () => {
      const output = selectCreateDeveloperSubscriptionError(mockState)
      expect(output).toEqual(mockState.developerSubscriptions.create.error)
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
