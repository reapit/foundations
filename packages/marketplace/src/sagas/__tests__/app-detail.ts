import appDetailSagas, {
  appDetailDataFetch,
  appDetailDataListen,
  requestAuthenticationCodeListen,
  requestAuthCode,
  fetchAuthCode,
  fetchAppDetail,
  fetchAppApiKey,
} from '../app-detail'
import { appDetailDataStub } from '../__stubs__/app-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailFailure,
  AppDetailParams,
  requestAuthenticationSuccess,
  requestAuthenticationFailure,
  setAppDetailStale,
} from '@/actions/app-detail'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'

jest.mock('@reapit/elements')

const paramsClientId: Action<AppDetailParams> = {
  data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52', clientId: 'DAC' },
  type: 'APP_DETAIL_REQUEST_DATA',
}

const params: Action<AppDetailParams> = {
  data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52' },
  type: 'APP_DETAIL_REQUEST_DATA',
}

describe('app-detail fetch data with clientId', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(paramsClientId)
  expect(gen.next().value).toEqual(put(appDetailLoading(true)))

  expect(gen.next().value).toEqual(
    call(fetchAppDetail, { id: paramsClientId.data.id, clientId: paramsClientId.data.clientId }),
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(
      put(
        appDetailReceiveData({
          data: appDetailDataStub.data,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(setAppDetailStale(false)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(appDetailFailure()))
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

describe('app-detail fetch data without clientId', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(params)
  expect(gen.next().value).toEqual(put(appDetailLoading(true)))
  expect(gen.next().value).toEqual(call(fetchAppDetail, { id: params.data.id, clientId: undefined }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(
      put(
        appDetailReceiveData({
          data: appDetailDataStub.data,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(setAppDetailStale(false)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(appDetailFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('app-detail fetch data and fetch apiKey', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(params)
  expect(gen.next().value).toEqual(put(appDetailLoading(true)))
  expect(gen.next().value).toEqual(call(fetchAppDetail, { id: params.data.id, clientId: undefined }))

  test('api call success', () => {
    const clone = gen.clone()
    const installationId = '09682122-0811-4f36-9bfa-05e337de3065'
    const isWebComponent = true
    const apiKey = 'mockApiKey'
    expect(
      clone.next({
        ...appDetailDataStub.data,
        isWebComponent,
        installationId,
      }).value,
    ).toEqual(call(fetchAppApiKey, { installationId }))
    expect(clone.next({ apiKey }).value).toEqual(
      put(
        appDetailReceiveData({
          data: { ...appDetailDataStub.data, isWebComponent, installationId, apiKey },
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(setAppDetailStale(false)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(appDetailFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('app-detail request auth code', () => {
  const params = {
    data: '45001c67-fd1d-467b-865f-360d5a189e6f',
    type: ActionTypes.REQUEST_AUTHENTICATION_CODE,
  } as Action<string>
  const response = {
    clientSecret: '45001c67-fd1d-467b-865f-360d5a189e6f',
  }
  const gen = cloneableGenerator(requestAuthCode)(params)

  expect(gen.next().value).toEqual(call(fetchAuthCode, params.data))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(response).value).toEqual(put(requestAuthenticationSuccess(response)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()

    expect(clone.next().value).toEqual(put(requestAuthenticationFailure()))
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

describe('app-detail thunks', () => {
  describe('appDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = appDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<AppDetailParams>>(ActionTypes.APP_DETAIL_REQUEST_DATA, appDetailDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })

    it('should trigger request auth code when called', () => {
      const gen = requestAuthenticationCodeListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<string>>(ActionTypes.REQUEST_AUTHENTICATION_CODE, requestAuthCode),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appDetailSagas', () => {
    it('should listen data request', () => {
      const gen = appDetailSagas()

      expect(gen.next().value).toEqual(all([fork(appDetailDataListen), fork(requestAuthenticationCodeListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
