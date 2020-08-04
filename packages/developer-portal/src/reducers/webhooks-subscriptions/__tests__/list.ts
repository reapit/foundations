import { webhooksSubscriptionsReducer, defaultWebhooksSubscriptionsState } from '../list'
import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { subscriptions } from '@/sagas/__stubs__/webhooks'

describe('webhookReducer', () => {
  describe('webhookSubscriptions reducer', () => {
    it('should return default state if action not matched', () => {
      const newState = webhooksSubscriptionsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultWebhooksSubscriptionsState)
    })

    it('should set state to test when FETCH_WEBHOOKS_SUBSCRIPTIONS action is called with test', () => {
      const newState = webhooksSubscriptionsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS as ActionType,
        data: {},
      })

      const expected = {
        ...defaultWebhooksSubscriptionsState,
        isLoading: true,
        errorMessage: '',
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_WEBHOOKS_SUBSCRIPTIONS_SUCCESS action is called with test', () => {
      const newState = webhooksSubscriptionsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS_SUCCESS as ActionType,
        data: subscriptions,
      })
      const expected = {
        ...defaultWebhooksSubscriptionsState,
        isLoading: false,
        errorMessage: '',
        ...subscriptions,
      }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_WEBHOOKS_SUBSCRIPTIONS_FAILED action is called with test', () => {
      const newState = webhooksSubscriptionsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS_FAILED as ActionType,
        data: '123',
      })
      const expected = {
        ...defaultWebhooksSubscriptionsState,
        isLoading: false,
        errorMessage: '123',
      }
      expect(newState).toEqual(expected)
    })
  })
})
