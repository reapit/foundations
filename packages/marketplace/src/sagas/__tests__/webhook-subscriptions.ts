import webhookSubscriptionsSagas, {
  fetchSubscriptions,
  fetchWebhookTopic,
  webhookSubscriptionsFetch,
  webhookTopicsFetch,
  webhookSubscriptionsListen,
  webhookTopicsListen,
} from '../webhook-subscriptions'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { put, call, fork, all, takeLatest } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { subscriptions, topics } from '../__stubs__/webhooks'
import {
  webhookSubscriptionsReceiveData,
  webhookTopicsReceiveData,
  setApplicationId,
} from '@/actions/webhook-subscriptions'
import ActionTypes from '@/constants/action-types'

jest.mock('@reapit/elements')

describe('webhook sagas', () => {
  describe('webhookSubscriptions fetch data', () => {
    const applicationIdParam: Action<string> = {
      data: 'applicationId',
      type: 'WEBHOOK_SUBSCRIPTION_REQUEST_DATA',
    }
    const gen = cloneableGenerator(webhookSubscriptionsFetch)(applicationIdParam)
    expect(gen.next().value).toEqual(put(setApplicationId(applicationIdParam.data)))
    expect(gen.next().value).toEqual(call(fetchSubscriptions, applicationIdParam.data))

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
      type: 'WEBHOOK_SUBSCRIPTION_REQUEST_DATA',
    }
    const gen = cloneableGenerator(webhookTopicsFetch)(applicationIdParam)
    expect(gen.next().value).toEqual(call(fetchWebhookTopic, applicationIdParam.data))

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
describe('developerWebhookSagas', () => {
  it('should listen request data', () => {
    const gen = webhookSubscriptionsSagas()

    expect(gen.next().value).toEqual(all([fork(webhookSubscriptionsListen), fork(webhookTopicsListen)]))
    expect(gen.next().done).toBe(true)
  })
})

describe('developerWebhook thunks', () => {
  describe('webhookSubscriptionsListen', () => {
    it('should webhookSubscriptionsFetch when called', () => {
      const gen = webhookSubscriptionsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<string>>(ActionTypes.WEBHOOK_SUBSCRIPTION_REQUEST_DATA, webhookSubscriptionsFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('webhookTopicsListen', () => {
    it('should webhookTopicsFetch when called', () => {
      const gen = webhookTopicsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<string>>(ActionTypes.WEBHOOK_TOPICS_REQUEST_DATA, webhookTopicsFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
