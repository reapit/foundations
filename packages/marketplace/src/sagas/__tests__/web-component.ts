import webComponentSagas, {
  putWebComponentConfigListen,
  fetchWebComponentConfigListen,
  putWebComponentConfigSaga,
  fetchWebComponentConfigSaga,
} from '../web-component'
import { call, put, all, fork, takeLatest } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import {
  PutWebComponentConfigParams,
  FetchWebComponentConfigParams,
  putWebComponentConfig,
  fetchWebComponentConfig,
  WebComponentConfigResult,
} from '@/services/web-component'
import ActionTypes from '@/constants/action-types'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { clientFetchWebComponentConfigSuccess, clientCloseWebComponentConfig } from '@/actions/client'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '../../../../elements/src/utils/validators/error-messages'

describe('webComponentSagas', () => {
  it('should listen request data', () => {
    const gen = webComponentSagas()

    expect(gen.next().value).toEqual(all([fork(fetchWebComponentConfigListen), fork(putWebComponentConfigListen)]))

    expect(gen.next().done).toBe(true)
  })
})

describe('putWebComponentConfigListen', () => {
  it('should editWebhook when called', () => {
    const gen = putWebComponentConfigListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<PutWebComponentConfigParams>>(
        ActionTypes.CLIENT_PUT_WEB_COMPONENT_CONFIG,
        putWebComponentConfigSaga,
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
    daysOfWeek: [1],
    negotiatorIds: ['1'],
  } as PutWebComponentConfigParams

  const gen = cloneableGenerator(putWebComponentConfigSaga as any)({ data: params })
  expect(gen.next().value).toEqual(call(putWebComponentConfig, params))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(params as any).value).toEqual(put(clientFetchWebComponentConfigSuccess(params)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(
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
    daysOfWeek: [1],
    negotiatorIds: ['1'],
  } as WebComponentConfigResult

  const gen = cloneableGenerator(fetchWebComponentConfigSaga as any)({ data: params })
  expect(gen.next().value).toEqual(call(fetchWebComponentConfig, params))

  it('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(respone as any).value).toEqual(put(clientFetchWebComponentConfigSuccess(respone)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    // @ts-ignore
    expect(clone.throw(new Error('Call API Failed')).value).toEqual(put(clientCloseWebComponentConfig()))
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
