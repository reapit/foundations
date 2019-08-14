import appDetailSagas, { appDetailDataFetch, appDetailDataListen } from '../app-detail'
import { appDetailDataStub } from '../__stubs__/app-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { appDetailLoading, appDetailReceiveData, appDetailFailure, AppDetailParams } from '@/actions/app-detail'
import { Action } from '@/types/core'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'

jest.mock('../../utils/fetcher')

const paramsClientId = { data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52', clientId: 'DAC' } }
const params = { data: { id: '9b6fd5f7-2c15-483d-b925-01b650538e52' } }

describe('app-detail fetch data with clientId', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(paramsClientId)
  expect(gen.next().value).toEqual(put(appDetailLoading(true)))

  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/${paramsClientId.data.id}?clientId=${paramsClientId.data.clientId}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(put(appDetailReceiveData(appDetailDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(appDetailFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('app-detail fetch data without clientId', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(params)
  expect(gen.next().value).toEqual(put(appDetailLoading(true)))

  expect(gen.next().value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}/${params.data.id}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appDetailDataStub.data).value).toEqual(put(appDetailReceiveData(appDetailDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(appDetailFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('app-detail thunks', () => {
  describe('appDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = appDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<AppDetailParams>>(ActionTypes.APP_DETAIL_REQUEST_DATA, appDetailDataFetch)
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
