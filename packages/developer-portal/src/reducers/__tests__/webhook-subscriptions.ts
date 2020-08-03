import { webhookSubscriptionsReducer, defaultState } from '../webhook-subscriptions'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { subscriptions } from '@/sagas/__stubs__/webhooks'

describe('webhookReducer', () => {
  describe('webhookSubscriptions reducer', () => {
    it('should return default state if action not matched', () => {
      const newState = webhookSubscriptionsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultState.subscriptions)
    })

    it('should set state to test when FETCH_WEBHOOK_SUBSCRIPTIONS action is called with test', () => {
      const newState = webhookSubscriptionsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS as ActionType,
        data: {},
      })

      const expected = { error: false, loading: true, subscriptions: { _embedded: [] } }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when FETCH_WEBHOOK_SUBSCRIPTIONS_SUCCESS action is called with test', () => {
      const newState = webhookSubscriptionsReducer(undefined, {
        type: ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS_SUCCESS as ActionType,
        data: subscriptions,
      })
      const expected = { error: false, loading: false, subscriptions: subscriptions }
      expect(newState).toEqual(expected)
    })
  })
})
