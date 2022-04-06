import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { call, put, takeLatest } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { developerSetFormState, setMyIdentity, developerSetWebhookPingStatus } from '@/actions/developer'
import {
  developerCreate,
  developerCreateListen,
  fetchMyIdentitySagasListen,
  fetchMyIdentitySagas,
  developerWebhookPingListen,
  developerWebhookPing,
} from '../developer'
import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { developerIdentity } from '../__stubs__/developer-identity'
import { pingWebhooksById, PingWebhooksByIdParams } from '@/services/webhooks'
import { createDeveloper, fetchDeveloperById } from '@/services/developers'
import { getDeveloperId } from '@/utils/session'
import { notification } from '@reapit/elements-legacy'

jest.mock('@/services/developers')
jest.mock('@/services/billing')

jest.mock('@reapit/elements', () => ({
  ...(jest.requireActual('@reapit/elements') as Object),
  notification: {
    error: jest.fn(),
  },
}))

const params = { data: { page: 1 } }

describe('developer create', () => {
  const params: CreateDeveloperModel = { name: '123' }
  const gen = cloneableGenerator(developerCreate as any)({ data: params })
  expect(gen.next().value).toEqual(put(developerSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(call(createDeveloper, params))
  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next('SUCCESS').value).toEqual(put(developerSetFormState('SUCCESS')))
    expect(clone.next().done).toEqual(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw('error').value).toEqual(put(developerSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      call(notification.error, {
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    )
    expect(clone.next().done).toEqual(true)
  })
})

describe('fetchMyIdentitySagas', () => {
  const developerId = '1'
  const gen = cloneableGenerator(fetchMyIdentitySagas as any)({ data: params })
  expect(gen.next().value).toEqual(call(getDeveloperId))
  expect(gen.next(developerId).value).toEqual(call(fetchDeveloperById, { id: developerId }))
  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(developerIdentity).value).toEqual(put(setMyIdentity(developerIdentity)))
    expect(clone.next().done).toEqual(true)
  })
})

describe('developerWebhookPing', () => {
  const params = {
    id: '2020-01',
    topicId: 'topicid',
  } as PingWebhooksByIdParams
  const gen = cloneableGenerator(developerWebhookPing as any)({ data: params })
  expect(gen.next().value).toEqual(put(developerSetWebhookPingStatus('LOADING')))
  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(call(pingWebhooksById, params))
    expect(clone.next().value).toEqual(put(developerSetWebhookPingStatus('SUCCESS')))
    expect(clone.next().done).toEqual(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw('error').value).toEqual(put(developerSetWebhookPingStatus('FAILED')))
    expect(clone.next().done).toEqual(true)
  })
})

describe('developer thunks', () => {
  describe('developerCreateListen', () => {
    it('should trigger developerCreact action', () => {
      const gen = fetchMyIdentitySagasListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.DEVELOPER_FETCH_MY_IDENTITY, fetchMyIdentitySagas))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerCreateListen', () => {
    it('should trigger developerCreact action', () => {
      const gen = developerCreateListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.DEVELOPER_CREATE, developerCreate))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerWebhookPingListen', () => {
    it('should trigger developerWebhookPing action', () => {
      const gen = developerWebhookPingListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.DEVELOPER_PING_WEBHOOK, developerWebhookPing))
      expect(gen.next().done).toBe(true)
    })
  })
})
