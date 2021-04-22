import { fetchWebhookLogs, webhookLogsListen, webhookLogsSagas } from '../webhook-logs'
import { put, call, takeLatest, all, fork } from '@redux-saga/core/effects'
import { Action } from '../../../types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { mockWebhookLogs, topics } from '../../__stubs__/webhooks'
import { fetchWebhookLogsError, fetchWebhookLogsSuccess } from '../../../actions/webhook-logs/webhook-logs'
import ActionTypes from '../../../constants/action-types'
import { fetchWebhooksTopicsListApi, fetchWebhookLogsApi, TopicModel } from '../../../services/webhooks'
import { WebhookLogsQuery } from '../../../components/pages/webhooks/webhook-logs-table'

jest.mock('../../../services/webhooks')
jest.mock('@reapit/elements')

describe('webhook logs', () => {
  describe('fetchWebhookLogs', () => {
    const params: Action<WebhookLogsQuery> = {
      data: { applicationId: 'SOME_ID', from: 'SOME_DATE_STRING', to: 'SOME_DATE_STRING' },
      type: 'FETCH_WEBHOOK_LOGS',
    }

    const gen = cloneableGenerator(fetchWebhookLogs as any)(params)
    expect(gen.next().value).toEqual(
      all([
        call(fetchWebhookLogsApi, { ...params.data }),
        call(fetchWebhooksTopicsListApi, { applicationId: params.data.applicationId }),
      ]),
    )

    it('should successfully call the topic and logs api', () => {
      const clone = gen.clone()
      expect(clone.next([{ topics }, { logs: mockWebhookLogs }]).value).toEqual
      put(fetchWebhookLogsSuccess({ topics: topics._embedded as TopicModel[], logs: mockWebhookLogs })),
        expect(clone.next().done).toBe(true)
    })

    it('should correctly handle an error', () => {
      const clone = gen.clone()
      expect(clone.throw && clone.throw({ description: 'mockError' }).value).toEqual(
        put(fetchWebhookLogsError('mockError')),
      )
      expect(clone.next().done).toBe(true)
    })
  })

  describe('webhookLogsListen', () => {
    it('should call fetchWebhookLogs when called', () => {
      const gen = webhookLogsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<WebhookLogsQuery>>(ActionTypes.FETCH_WEBHOOK_LOGS, fetchWebhookLogs),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('webhookLogsSagas', () => {
    it('should correctly aggregate sagas', () => {
      const gen = webhookLogsSagas()
      expect(gen.next().value).toEqual(all([fork(webhookLogsListen)]))
      expect(gen.next().done).toEqual(true)
    })
  })
})
