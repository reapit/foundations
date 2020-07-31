import appDetailSagas, { appDetailDataFetch, appDetailDataListen } from '../app-detail'
import { appDetailDataStub } from '../__stubs__/app-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  fetchAppDetailLoading,
  receiveAppDetailData,
  fetchAppDetailFailed,
  AppDetailParams,
  setAppDetailStale,
} from '@/actions/app-detail'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { fetchAppById } from '@/services/apps'
import { fetchApiKeyInstallationById } from '@/services/installations'

jest.mock('@reapit/elements')
jest.mock('@/services/apps')
jest.mock('@/services/installations')

const paramsClientId: Action<AppDetailParams> = {
  data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52', clientId: 'DAC' },
  type: 'FETCH_APP_DETAIL_DATA',
}

const params: Action<AppDetailParams> = {
  data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52' },
  type: 'FETCH_APP_DETAIL_DATA',
}

describe('app-detail fetch data with clientId', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(paramsClientId)
  expect(gen.next().value).toEqual(put(fetchAppDetailLoading(true)))

  expect(gen.next().value).toEqual(call(fetchAppById, { ...paramsClientId.data }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(
      put(
        receiveAppDetailData({
          data: appDetailDataStub.data,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(setAppDetailStale(false)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(fetchAppDetailFailed()))
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

describe('app-detail fetch data without clientId', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(params)
  expect(gen.next().value).toEqual(put(fetchAppDetailLoading(true)))
  expect(gen.next().value).toEqual(call(fetchAppById, { id: params.data.id, clientId: undefined }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(
      put(
        receiveAppDetailData({
          data: appDetailDataStub.data,
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(setAppDetailStale(false)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(fetchAppDetailFailed()))
    expect(clone.next().done).toBe(true)
  })
})

describe('app-detail fetch data and fetch apiKey', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(params)
  expect(gen.next().value).toEqual(put(fetchAppDetailLoading(true)))
  expect(gen.next().value).toEqual(call(fetchAppById, { id: params.data.id, clientId: undefined }))

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
    ).toEqual(call(fetchApiKeyInstallationById, { installationId }))
    expect(clone.next({ apiKey }).value).toEqual(
      put(
        receiveAppDetailData({
          data: { ...appDetailDataStub.data, isWebComponent, installationId, apiKey },
        }),
      ),
    )
    expect(clone.next().value).toEqual(put(setAppDetailStale(false)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(fetchAppDetailFailed()))
    expect(clone.next().done).toBe(true)
  })
})

describe('app-detail thunks', () => {
  describe('appDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = appDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<AppDetailParams>>(ActionTypes.FETCH_APP_DETAIL_DATA, appDetailDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appDetailSagas', () => {
    it('should listen data request', () => {
      const gen = appDetailSagas()
      expect(gen.next().value).toEqual(all([fork(appDetailDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
