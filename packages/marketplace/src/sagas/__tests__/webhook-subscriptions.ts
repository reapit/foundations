import {
  fetchSubscriptions,
  fetchWebhookTopic,
  webhookSubscriptionsFetch,
  webhookTopicsFetch,
} from '../webhook-subscriptions'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { put, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { subscriptions, topics } from '../__stubs__/webhooks'
import { webhookSubscriptionsReceiveData, webhookTopicsReceiveData } from '@/actions/webhook-subscriptions'

jest.mock('@reapit/elements')

describe('webhook sagas', () => {
  describe('webhookSubscriptions fetch data', () => {
    const gen = cloneableGenerator(webhookSubscriptionsFetch)()
    expect(gen.next().value).toEqual(call(fetchSubscriptions))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(subscriptions).value).toEqual(put(webhookSubscriptionsReceiveData(subscriptions)))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      // @ts-ignore
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

  describe('webhookTopics fetch data', () => {
    const applicationIdParam: Action<string> = {
      data: 'applicationId',
      type: 'WEBHOOK_TOPICS_REQUEST_DATA',
    }
    const gen = cloneableGenerator(webhookTopicsFetch)(applicationIdParam)
    expect(gen.next().value).toEqual(call(fetchWebhookTopic, 'applicationId'))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(topics).value).toEqual(put(webhookTopicsReceiveData(topics)))
      expect(clone.next().done).toBe(true)
    })

    test('api call error', () => {
      const clone = gen.clone()
      // @ts-ignore
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
