import { webhookSubscriptionsReducer, webhookTopicsReducer, defaultState } from '../webhook-subscriptions'
import { ActionType } from '../../types/core'
import ActionTypes from '../../constants/action-types'
import { subscriptions, topics } from '@/sagas/__stubs__/webhooks'

describe('webhookReducer', () => {
  describe('webhookSubscriptions reducer', () => {
    it('should return default state if action not matched', () => {
      const newState = webhookSubscriptionsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultState.subscriptions)
    })

    it('should set state to test when WEBHOOK_SUBSCRIPTION_REQUEST_DATA action is called with test', () => {
      const newState = webhookSubscriptionsReducer(undefined, {
        type: ActionTypes.WEBHOOK_SUBSCRIPTION_REQUEST_DATA as ActionType,
        data: {},
      })

      const expected = { error: false, loading: true, subscriptions: { _embedded: [] } }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when WEBHOOK_SUBSCRIPTION_RECEIVE_DATA action is called with test', () => {
      const newState = webhookSubscriptionsReducer(undefined, {
        type: ActionTypes.WEBHOOK_SUBSCRIPTION_RECEIVE_DATA as ActionType,
        data: subscriptions,
      })
      const expected = { error: false, loading: false, subscriptions: subscriptions }
      expect(newState).toEqual(expected)
    })
  })

  describe('webhookTopicsReducer', () => {
    it('should return default state if action not matched', () => {
      const newState = webhookTopicsReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
      expect(newState).toEqual(defaultState.topics)
    })

    it('should set state to test when WEBHOOK_TOPICS_REQUEST_DATA action is called with test', () => {
      const newState = webhookTopicsReducer(undefined, {
        type: ActionTypes.WEBHOOK_TOPICS_REQUEST_DATA as ActionType,
        data: '1',
      })
      const expected = { error: false, loading: true, topics: { _embedded: [] } }
      expect(newState).toEqual(expected)
    })

    it('should set state to test when WEBHOOK_TOPICS_RECEIVE_DATA action is called with test', () => {
      const newState = webhookTopicsReducer(undefined, {
        type: ActionTypes.WEBHOOK_TOPICS_RECEIVE_DATA as ActionType,
        data: topics,
      })
      const expected = { error: false, loading: false, topics }
      expect(newState).toEqual(expected)
    })
  })
})
