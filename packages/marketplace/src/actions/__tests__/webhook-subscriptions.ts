import {
  webhookSubscriptionsRequestData,
  webhookSubscriptionsReceiveData,
  webhookTopicsRequestData,
  webhookTopicsReceiveData,
} from '../webhook-subscriptions'
import ActionTypes from '../../constants/action-types'

describe('webhookSubscriptions actions', () => {
  it('should create a webhookSubscriptionsRequestData action', () => {
    expect(webhookSubscriptionsRequestData.type).toEqual(ActionTypes.WEBHOOK_SUBSCRIPTION_REQUEST_DATA)
  })

  it('should create a webhookSubscriptionsReceiveData action', () => {
    expect(webhookSubscriptionsReceiveData.type).toEqual(ActionTypes.WEBHOOK_SUBSCRIPTION_RECEIVE_DATA)
  })

  it('should create a webhookTopicsRequestData action', () => {
    expect(webhookTopicsRequestData.type).toEqual(ActionTypes.WEBHOOK_TOPICS_REQUEST_DATA)
  })

  it('should create a webhookTopicsReceiveData action', () => {
    expect(webhookTopicsReceiveData.type).toEqual(ActionTypes.WEBHOOK_TOPICS_RECEIVE_DATA)
  })
})
