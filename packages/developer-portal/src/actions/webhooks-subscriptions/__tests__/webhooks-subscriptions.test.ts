import {
  fetchWebhooksSubscriptions,
  fetchWebhooksSubscriptionsSuccess,
  fetchWebhooksSubscriptionsFailed,
} from '../webhooks-subscriptions'
import ActionTypes from '@/constants/action-types'

describe('webhookSubscriptions actions', () => {
  describe('fetchWebhooksSubscriptions', () => {
    it('should create a fetchWebhooksSubscriptions action', () => {
      expect(fetchWebhooksSubscriptions.type).toEqual(ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS)
    })
  })
  describe('fetchWebhooksSubscriptionsSuccess', () => {
    it('should create a fetchWebhooksSubscriptionsSuccess action', () => {
      expect(fetchWebhooksSubscriptionsSuccess.type).toEqual(ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS_SUCCESS)
    })
  })

  describe('fetchWebhooksSubscriptionsFailed', () => {
    it('should create a fetchWebhooksSubscriptionsFailed action', () => {
      expect(fetchWebhooksSubscriptionsFailed.type).toEqual(ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS_FAILED)
    })
  })
})
