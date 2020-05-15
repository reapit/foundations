import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { call, put, takeLatest, all, fork, select } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  developerLoading,
  developerReceiveData,
  developerRequestDataFailure,
  developerSetFormState,
  setMyIdentity,
  fetchBillingFailure,
  fetchBillingSuccess,
  fetchMonthlyBillingSuccess,
  fetchMonthlyBillingFailure,
  developerSetWebhookPingStatus,
} from '@/actions/developer'
import developerSagas, {
  developerDataFetch,
  developerRequestDataListen,
  developerCreate,
  developerCreateListen,
  fetchMyIdentitySagasListen,
  fetchBillingSagasListen,
  fetchMyIdentitySagas,
  fetchBillingSagas,
  fetchMonthlyBillingSagasListen,
  fetchMonthlyBillingSagas,
  developerWebhookPingListen,
  developerWebhookPing,
} from '../developer'
import ActionTypes from '@/constants/action-types'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { appsDataStub } from '../__stubs__/apps'
import { appPermissionStub } from '../__stubs__/app-permission'
import { Action } from '@/types/core'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { selectDeveloperId } from '@/selector/developer'
import { FetchBillingParams } from '../api'
import { developerIdentity } from '../__stubs__/developer-identity'
import { billing } from '../__stubs__/billing'
import { monthlyBillingData } from '../__stubs__/monthly-billing'
import { pingWebhooksById } from '@/services/webhooks'
import { fetchAppsList } from '@/services/apps'
import { fetchScopesList } from '@/services/scopes'
import { createDeveloper, fetchDeveloperById } from '@/services/developers'
import { fetchBillings } from '@/services/traffic-events'

jest.mock('@/services/apps')
jest.mock('@/services/scopes')
jest.mock('@/services/developers')
jest.mock('@/services/traffic-events')

jest.mock('@reapit/elements')

const params = { data: { page: 1 } }

describe('developer fetch data', () => {
  const gen = cloneableGenerator(developerDataFetch as any)(params)
  const developerId = '72ad4ed6-0df0-4a28-903c-55899cffee85'

  expect(gen.next().value).toEqual(put(developerLoading(true)))
  expect(gen.next().value).toEqual(select(selectDeveloperId))
  expect(gen.next(developerId).value).toEqual(
    all([
      call(fetchAppsList, { developerId, pageNumber: params.data.page, pageSize: APPS_PER_PAGE }),
      call(fetchScopesList),
    ]),
  )

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next([appsDataStub.data, appPermissionStub]).value).toEqual(
      put(developerReceiveData({ ...appsDataStub, scopes: appPermissionStub })),
    )
    expect(clone.next().done).toBe(true)
  })

  it('api call fail when data undefined', () => {
    const clone = gen.clone()
    expect(clone.next([undefined, appPermissionStub]).value).toEqual(put(developerRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })

  it('api call fail when scopes undefined', () => {
    const clone = gen.clone()
    expect(clone.next([appsDataStub.data, undefined]).value).toEqual(put(developerRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })
  it('api call fail when all scopes undefined', () => {
    const clone = gen.clone()
    expect(clone.next([undefined, undefined]).value).toEqual(put(developerRequestDataFailure()))
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

describe('developer create', () => {
  const params: CreateDeveloperModel = { name: '123' }
  const gen = cloneableGenerator(developerCreate as any)({ data: params })
  expect(gen.next().value).toEqual(put(developerSetFormState('SUBMITTING')))
  expect(gen.next().value).toEqual(call(createDeveloper, data))
  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next('SUCCESS').value).toEqual(put(developerSetFormState('SUCCESS')))
    expect(clone.next().done).toEqual(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(put(developerSetFormState('ERROR')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toEqual(true)
  })
})

describe('fetchMyIdentitySagas', () => {
  const developerId = '1'
  const gen = cloneableGenerator(fetchMyIdentitySagas as any)({ data: params })
  expect(gen.next().value).toEqual(put(developerLoading(true)))
  expect(gen.next().value).toEqual(select(selectDeveloperId))
  expect(gen.next(developerId).value).toEqual(call(fetchDeveloperById, { id: developerId }))
  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(developerIdentity).value).toEqual(put(setMyIdentity(developerIdentity)))
    expect(clone.next().value).toEqual(put(developerLoading(false)))
    expect(clone.next().done).toEqual(true)
  })

  it('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(put(developerLoading(false)))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toEqual(true)
  })
})

describe('fetchBillingSagas', () => {
  const params = {
    dateFrom: '2020-01',
    dateTo: '2020-05',
    applicationId: ['1', '2'],
  } as FetchBillingParams
  const gen = cloneableGenerator(fetchBillingSagas as any)({ data: params })
  expect(gen.next().value).toEqual(call(fetchBillings, params))
  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(billing).value).toEqual(put(fetchBillingSuccess(billing)))
    expect(clone.next().done).toEqual(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(put(fetchBillingFailure('error')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toEqual(true)
  })
})

describe('fetchMonthlyBillingSagas', () => {
  const params = {
    month: '2020-01',
    applicationId: ['1', '2'],
  } as FetchMonthlyBillingParams
  const gen = cloneableGenerator(fetchMonthlyBillingSagas as any)({ data: params })
  expect(gen.next().value).toEqual(call(fetchBillingsByMonth, params))
  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(monthlyBillingData).value).toEqual(put(fetchMonthlyBillingSuccess(monthlyBillingData)))
    expect(clone.next().done).toEqual(true)
  })
  it('api call error', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(put(fetchMonthlyBillingFailure('error')))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toEqual(true)
  })
})

describe('developerWebhookPing', () => {
  const params = {
    id: '2020-01',
    topicId: 'topicid',
  } as WebhookPingTestParams
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
    // @ts-ignore
    expect(clone.throw('error').value).toEqual(put(developerSetWebhookPingStatus('FAILED')))
    expect(clone.next().done).toEqual(true)
  })
})

describe('developer thunks', () => {
  describe('developerRequestDataListen', () => {
    it('should request data listen', () => {
      const gen = developerRequestDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerCreateListen', () => {
    it('should trigger developerCreact action', () => {
      const gen = fetchMyIdentitySagasListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.DEVELOPER_FETCH_MY_IDENTITY, fetchMyIdentitySagas))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerCreateListen', () => {
    it('should trigger developerCreact action', () => {
      const gen = fetchBillingSagasListen()
      expect(gen.next().value).toEqual(takeLatest(ActionTypes.DEVELOPER_FETCH_BILLING, fetchBillingSagas))
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

  describe('fetchMonthlyBillingSagasListen', () => {
    it('should trigger developerCreact action', () => {
      const gen = fetchMonthlyBillingSagasListen()
      expect(gen.next().value).toEqual(
        takeLatest(ActionTypes.DEVELOPER_FETCH_MONTHLY_BILLING, fetchMonthlyBillingSagas),
      )
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

  describe('developerSagas', () => {
    it('should listen developer request data & create app action', () => {
      const gen = developerSagas()

      expect(gen.next().value).toEqual(
        all([
          fork(developerRequestDataListen),
          fork(developerCreateListen),
          fork(fetchMyIdentitySagasListen),
          fork(fetchBillingSagasListen),
          fork(fetchMonthlyBillingSagasListen),
          fork(developerWebhookPingListen),
        ]),
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
