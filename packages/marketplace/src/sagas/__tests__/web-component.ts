import webComponentSagas, {
  updateWebComponentConfigListen,
  fetchWebComponentConfigListen,
  updateWebComponentConfigSaga,
  fetchWebComponentConfigSaga,
} from '../web-component'
import { call, put, all, fork, takeLatest } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import {
  UpdateWebComponentConfigParams,
  FetchWebComponentConfigParams,
  updateWebComponentConfig,
  fetchWebComponentConfig,
  WebComponentConfigResult,
} from '@/services/web-component'
import ActionTypes from '@/constants/action-types'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  clientFetchWebComponentConfigSuccess,
  clientFetchNegotiatorsSuccess,
  clientFetchWebComponentConfigFailed,
  clientUpdateWebComponentConfigFailed,
} from '@/actions/client'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '../../../../elements/src/utils/validators/error-messages'
import { fetchNegotiators, NegotiatorsResult } from '@/services/negotiators'

describe('webComponentSagas', () => {
  it('should listen request data', () => {
    const gen = webComponentSagas()

    expect(gen.next().value).toEqual(all([fork(fetchWebComponentConfigListen), fork(updateWebComponentConfigListen)]))

    expect(gen.next().done).toBe(true)
  })
})

describe('updateWebComponentConfigListen', () => {
  it('should editWebhook when called', () => {
    const gen = updateWebComponentConfigListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<UpdateWebComponentConfigParams>>(
        ActionTypes.CLIENT_UPDATE_WEB_COMPONENT_CONFIG,
        updateWebComponentConfigSaga,
      ),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('fetchWebComponentConfigListen', () => {
  it('should editWebhook when called', () => {
    const gen = fetchWebComponentConfigListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchWebComponentConfigParams>>(
        ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG,
        fetchWebComponentConfigSaga,
      ),
    )
    expect(gen.next().done).toBe(true)
  })
})

describe('putWebComponentConfigSaga', () => {
  const params = {
    appointmentLength: 12,
    appointmentTimeGap: 21,
    customerId: 'string',
    daysOfWeek: ['1'],
    negotiatorIds: ['1'],
    appId: 'appId',
  } as UpdateWebComponentConfigParams

  const gen = cloneableGenerator(updateWebComponentConfigSaga as any)({ data: params })
  expect(gen.next().value).toEqual(call(updateWebComponentConfig, params))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(params as any).value).toEqual(put(clientFetchWebComponentConfigSuccess(params)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(clientUpdateWebComponentConfigFailed()))
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR,
        }),
      ),
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('fetchWebComponentConfigSaga', () => {
  const params = {
    customerId: 'string',
  } as FetchWebComponentConfigParams

  const respone = {
    appointmentLength: 12,
    appointmentTimeGap: 21,
    customerId: 'string',
    daysOfWeek: ['1'],
    negotiatorIds: ['1'],
  } as WebComponentConfigResult

  const list = {
    pageCount: 99,
    pageNumber: 99,
    pageSize: 9,
    totalCount: 99,
    _embedded: [
      {
        active: true,
        created: 'string',
        email: 'string',
        id: 'string',
        jobTitle: 'string',
        metadata: 'any',
        mobilePhone: 'string',
        modified: 'string',
        name: 'string',
        officeId: 'string',
        workPhone: 'string',
      },
    ],
  } as NegotiatorsResult

  const gen = cloneableGenerator(fetchWebComponentConfigSaga as any)({ data: params })
  expect(gen.next().value).toEqual(all([call(fetchWebComponentConfig, params), call(fetchNegotiators, {})]))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next([respone, list]).value).toEqual(put(clientFetchWebComponentConfigSuccess(respone)))
    expect(clone.next().value).toEqual(put(clientFetchNegotiatorsSuccess(list)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (!clone.throw) throw new Error('Generator object cannot throw')
    expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(clientFetchWebComponentConfigFailed()))
    expect(clone.next().done).toBe(true)
  })
})
