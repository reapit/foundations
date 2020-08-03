import { webhookSubscriptionsFetch, webhookSubscriptionsListen } from '../webhook-subscriptions'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { put, call, takeLatest } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { subscriptions } from '../__stubs__/webhooks'
import { webhookSubscriptionsReceiveData, setApplicationId } from '@/actions/webhook-subscriptions'
import ActionTypes from '@/constants/action-types'
import { fetchWebhooksSubscriptionsList } from '@/services/webhooks'

jest.mock('@/services/webhooks')
jest.mock('@reapit/elements')

describe('webhook sagas', () => {
  describe('webhookSubscriptions fetch data', () => {
    const applicationIdParam: Action<string> = {
      data: 'applicationId',
      type: 'FETCH_WEBHOOK_SUBSCRIPTIONS',
    }
    const gen = cloneableGenerator(webhookSubscriptionsFetch)(applicationIdParam)
    expect(gen.next().value).toEqual(put(setApplicationId(applicationIdParam.data)))
    expect(gen.next().value).toEqual(call(fetchWebhooksSubscriptionsList, { applicationId: [applicationIdParam.data] }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(subscriptions).value).toEqual(put(webhookSubscriptionsReceiveData(subscriptions)))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      if (!clone.throw) throw new Error('Generator object cannot throw')
      expect(clone.throw('error').value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
    })
  })
})

describe('developerWebhook thunks', () => {
  describe('webhookSubscriptionsListen', () => {
    it('should webhookSubscriptionsFetch when called', () => {
      const gen = webhookSubscriptionsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<string>>(ActionTypes.FETCH_WEBHOOK_SUBSCRIPTIONS, webhookSubscriptionsFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
