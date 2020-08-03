import { fetchWebhooksTopics, webhooksTopicsListen, webhooksTopicsSagas } from '../webhooks-topics'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { topics } from '@/sagas/__stubs__/webhooks'
import { fetchWebhooksTopicsFailed, fetchWebhooksTopicsSuccess } from '@/actions/webhooks-topics'
import ActionTypes from '@/constants/action-types'
import { fetchWebhooksTopicsListApi, FetchWebhooksTopicsListParams } from '@/services/webhooks'

jest.mock('@/services/webhooks')
jest.mock('@reapit/elements')

describe('webhook-topics', () => {
  describe('webhookTopicsFetch', () => {
    const params: Action<FetchWebhooksTopicsListParams> = {
      data: { applicationId: 'applicationId' },
      type: 'FETCH_WEBHOOK_TOPICS',
    }
    const gen = cloneableGenerator(fetchWebhooksTopics)(params)
    expect(gen.next().value).toEqual(call(fetchWebhooksTopicsListApi, { ...params.data }))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(topics).value).toEqual(put(fetchWebhooksTopicsSuccess(topics)))
      expect(clone.next().done).toBe(true)
    })

    it('api call error', () => {
      const clone = gen.clone()
      expect(clone.throw && clone.throw({ description: 'mockError' }).value).toEqual(
        put(fetchWebhooksTopicsFailed('mockError')),
      )
      expect(clone.next().done).toBe(true)
    })
  })

  describe('webhookTopicsListen', () => {
    it('should webhookTopicsFetch when called', () => {
      const gen = webhooksTopicsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchWebhooksTopicsListParams>>(ActionTypes.FETCH_WEBHOOK_TOPICS, fetchWebhooksTopics),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('webhooksTopicsSagas', () => {
    it('should run correctly', () => {
      const gen = webhooksTopicsSagas()
      expect(gen.next().value).toEqual(all([fork(webhooksTopicsListen)]))
      expect(gen.next().done).toEqual(true)
    })
  })
})
