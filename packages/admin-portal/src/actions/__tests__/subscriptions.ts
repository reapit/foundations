import {
  fetchSubscriptionList,
  fetchSubscriptionListFailed,
  fetchSubscriptionListSuccess,
  cancelSubscription,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailed,
  createSubscription,
  createSubscriptionFailed,
  fetchSubscriptionsByTypeAndDev,
  fetchSubscriptionsByTypeAndDevSuccess,
} from '../subscriptions'
import ActionTypes from '../../constants/action-types'

describe('subscriptions actions', () => {
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

  it('should create a cancelSubscriptionSuccess action', () => {
    expect(cancelSubscriptionSuccess.type).toEqual(ActionTypes.CANCEL_SUBSCRIPTION_SUCCESS)
  })

  it('should create a cancelSubscriptionFailed action', () => {
    expect(cancelSubscriptionFailed.type).toEqual(ActionTypes.CANCEL_SUBSCRIPTION_FAILED)
  })

  it('should create a createSubscription action', () => {
    expect(createSubscription.type).toEqual(ActionTypes.CREATE_SUBSCRIPTION)
  })

  it('should create a createSubscriptionFailed action', () => {
    expect(createSubscriptionFailed.type).toEqual(ActionTypes.CREATE_SUBSCRIPTION_FAILED)
  })

  it('should create a cancelSubscriptionFailed action', () => {
    expect(cancelSubscriptionFailed.type).toEqual(ActionTypes.CANCEL_SUBSCRIPTION_FAILED)
  })

  it('should create a fetchSubscriptionsByTypeAndDev action', () => {
    expect(fetchSubscriptionsByTypeAndDev.type).toEqual(ActionTypes.FETCH_SUBSCRIPTIONS_BY_TYPE_AND_DEV)
  })

  it('should create a fetchSubscriptionsByTypeAndDevSuccess action', () => {
    expect(fetchSubscriptionsByTypeAndDevSuccess.type).toEqual(ActionTypes.FETCH_SUBSCRIPTIONS_BY_TYPE_AND_DEV_SUCCESS)
  })
})
