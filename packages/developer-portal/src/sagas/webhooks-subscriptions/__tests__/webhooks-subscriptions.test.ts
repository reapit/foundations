import { webhooksSubscriptionsFetch, webhooksSubscriptionsListen } from '../webhooks-subscriptions'
import { put, call, takeLatest } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { subscriptions } from '@/sagas/__stubs__/webhooks'
import {
  fetchWebhooksSubscriptionsFailed,
  fetchWebhooksSubscriptionsSuccess,
  setApplicationId,
} from '@/actions/webhooks-subscriptions'
import ActionTypes from '@/constants/action-types'
import { fetchWebhooksSubscriptionsListApi, FetchWebhooksSubscriptionsListParams } from '@/services/webhooks'

jest.mock('@/services/webhooks')
jest.mock('@reapit/elements')

describe('webhooks-subscriptions', () => {
  describe('webhooksSubscriptionsFetch', () => {
    const applicationIdParam: Action<FetchWebhooksSubscriptionsListParams> = {
      data: { applicationId: ['applicationId'] as string[] },
      type: 'FETCH_WEBHOOKS_SUBSCRIPTIONS',
    }
    const gen = cloneableGenerator(webhooksSubscriptionsFetch)(applicationIdParam)
    expect(gen.next().value).toEqual(put(setApplicationId(applicationIdParam.data.applicationId?.[0] as string)))
    expect(gen.next().value).toEqual(call(fetchWebhooksSubscriptionsListApi, applicationIdParam.data))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(subscriptions).value).toEqual(put(fetchWebhooksSubscriptionsSuccess(subscriptions)))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchWebhooksSubscriptionsFailed(err.description)))
    })
  })
  describe('webhooksSubscriptionsListen', () => {
    it('should webhookSubscriptionsFetch when called', () => {
      const gen = webhooksSubscriptionsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchWebhooksSubscriptionsListParams>>(
          ActionTypes.FETCH_WEBHOOKS_SUBSCRIPTIONS,
          webhooksSubscriptionsFetch,
        ),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
