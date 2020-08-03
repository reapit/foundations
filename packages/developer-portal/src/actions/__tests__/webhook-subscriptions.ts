import { webhookSubscriptionsRequestData, webhookSubscriptionsReceiveData } from '../webhook-subscriptions'
import ActionTypes from '../../constants/action-types'

describe('webhookSubscriptions actions', () => {
  it('should create a webhookSubscriptionsRequestData action', () => {
    expect(webhookSubscriptionsRequestData.type).toEqual(ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS)
  })

  it('should create a webhookSubscriptionsReceiveData action', () => {
    expect(webhookSubscriptionsReceiveData.type).toEqual(ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS_SUCCESS)
  })
})
