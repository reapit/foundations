import {
  fetchSubscriptionList,
  fetchSubscriptionListFailed,
  fetchSubscriptionListSuccess,
  cancelSubscription,
} from '../subscriptions'
import ActionTypes from '../../constants/action-types'

describe('admin dev management actions', () => {
  it('should create a fetchSubscriptionList action', () => {
    expect(fetchSubscriptionList.type).toEqual(ActionTypes.FETCH_SUBSCRIPTION_LIST)
  })

  it('should create a fetchSubscriptionListFailed action', () => {
    expect(fetchSubscriptionListFailed.type).toEqual(ActionTypes.FETCH_SUBSCRIPTION_LIST_FAILED)
  })

  it('should create a fetchSubscriptionListSuccess action', () => {
    expect(fetchSubscriptionListSuccess.type).toEqual(ActionTypes.FETCH_SUBSCRIPTION_LIST_SUCCESS)
  })

  it('should create a cancelSubscription action', () => {
    expect(cancelSubscription.type).toEqual(ActionTypes.CANCEL_SUBSCRIPTION)
  })
})
