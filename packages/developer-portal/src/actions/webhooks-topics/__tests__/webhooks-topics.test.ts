import ActionTypes from '@/constants/action-types'
import { fetchWebhooksTopics, fetchWebhooksTopicsFailed, fetchWebhooksTopicsSuccess } from '../webhooks-topics'

describe('webhooks-topics', () => {
  describe('fetchWebhooksTopics', () => {
    it('should create a fetchWebhooksTopics action', () => {
      expect(fetchWebhooksTopics.type).toEqual(ActionTypes.FETCH_WEBHOOK_TOPICS)
    })
  })
  describe('fetchWebhooksTopicsSuccess', () => {
    it('should create a webhookTopicsReceiveData action', () => {
      expect(fetchWebhooksTopicsSuccess.type).toEqual(ActionTypes.FETCH_WEBHOOK_TOPICS_SUCCESS)
    })
  })
  describe('fetchWebhooksTopicsFailed', () => {
    it('should create a webhookTopicsReceiveData action', () => {
      expect(fetchWebhooksTopicsFailed.type).toEqual(ActionTypes.FETCH_WEBHOOK_TOPICS_FAILED)
    })
  })
})
