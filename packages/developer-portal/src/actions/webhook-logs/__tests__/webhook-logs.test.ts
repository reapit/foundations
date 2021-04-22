import ActionTypes from '../../../constants/action-types'
import { fetchWebhookLogs, fetchWebhookLogsError, fetchWebhookLogsSuccess } from '../webhook-logs'

describe('webhook logs', () => {
  describe('fetchWebhookLogs', () => {
    it('should create a fetchWebhookLogs action', () => {
      expect(fetchWebhookLogs.type).toEqual(ActionTypes.FETCH_WEBHOOK_LOGS)
    })
  })

  describe('fetchWebhookLogsSuccess', () => {
    it('should create a webhookTopicsReceiveData action', () => {
      expect(fetchWebhookLogsSuccess.type).toEqual(ActionTypes.FETCH_WEBHOOK_LOGS_SUCCESS)
    })
  })

  describe('fetchWebhookLogsError', () => {
    it('should create a webhookTopicsReceiveData action', () => {
      expect(fetchWebhookLogsError.type).toEqual(ActionTypes.FETCH_WEBHOOK_LOGS_ERROR)
    })
  })
})
