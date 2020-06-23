import {
  developerFetchSubscriptions,
  developerFetchSubscriptionsSuccess,
  developerDeleteSubscription,
  developerCreateSubscription,
  developerCreateSubscriptionFalure,
  developerCreateSubscriptionSuccess,
  CreateSubscriptionParams,
} from '../developer-subscriptions'
import ActionTypes from '../../constants/action-types'
import { FetchSubscriptionsListParams } from '@/services/developer-subscriptions'
import { subscriptionModelStub, listSubscriptionsStub } from '../../sagas/__stubs__/developer-subscriptions'

describe('DeveloperSubscriptions actions', () => {
  it('should create a developerFetchSubscriptions action', () => {
    const params: FetchSubscriptionsListParams = {
      developerId: '123',
      subscriptionType: 'developerEdition',
    }
    expect(developerFetchSubscriptions.type).toEqual(ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS)
    expect(developerFetchSubscriptions(params).data).toEqual(params)
  })

  it('should create a developerFetchSubscriptionsSuccess action', () => {
    expect(developerFetchSubscriptionsSuccess.type).toEqual(ActionTypes.DEVELOPER_FETCH_SUBSCRIPTIONS_SUCCESS)
    expect(developerFetchSubscriptionsSuccess(listSubscriptionsStub).data).toEqual(listSubscriptionsStub)
  })

  it('should create a developerCreateSubscription action', () => {
    const params: CreateSubscriptionParams = {
      params: {
        developerId: '123',
        applicationId: '123',
        user: 'tester@reapit.com',
        type: 'developerEdition',
      },
      onCreated: jest.fn(),
    }
    expect(developerCreateSubscription.type).toEqual(ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE)
    expect(developerCreateSubscription(params).data).toEqual(params)
  })

  it('should create a developerCreateSubscriptionSuccess action', () => {
    expect(developerCreateSubscriptionSuccess.type).toEqual(ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE_SUCCESS)
    expect(developerCreateSubscriptionSuccess(subscriptionModelStub).data).toEqual(subscriptionModelStub)
  })

  it('should create a developerCreateSubscriptionFalure action', () => {
    expect(developerCreateSubscriptionFalure.type).toEqual(ActionTypes.DEVELOPER_SUBSCRIPTION_CREATE_FAILURE)
  })

  it('should create a developerDeleteSubscription action', () => {
    expect(developerDeleteSubscription.type).toEqual(ActionTypes.DEVELOPER_DELETE_SUBSCRIPTION)
  })
})
