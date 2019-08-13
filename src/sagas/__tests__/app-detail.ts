import appDetailSagas, { appDetailDataFetch, appDetailDataListen } from '../app-detail'
import { appDetailDataStub } from '../__stubs__/app-detail'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { appDetailLoading, appDetailReceiveData, appDetailFailure } from '@/actions/app-detail'
import { Action } from '@/types/core'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { selectClientId } from '@/selector/client'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'

jest.mock('../../utils/fetcher')

const params = { data: '9b6fd5f7-2c15-483d-b925-01b650538e52' }

describe('app-detail fetch data', () => {
  const gen = cloneableGenerator(appDetailDataFetch)(params)
  expect(gen.next().value).toEqual(put(appDetailLoading(true)))
  expect(gen.next('1').value).toEqual(select(selectClientId))

  test('clientId not exist', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
  })

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(1).value).toEqual(
      call(fetcher, {
        url: `${URLS.apps}/${params.data}?clientId=1`,
        api: REAPIT_API_BASE_URL,
        method: 'GET',
        headers: MARKETPLACE_HEADERS
      })
    )
    expect(clone.next(appDetailDataStub.data).value).toEqual(put(appDetailReceiveData(appDetailDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(
      put(
        errorThrownServer({
          type: 'SERVER',
          message: errorMessages.DEFAULT_SERVER_ERROR
        })
      )
    )
    expect(clone.next().done).toBe(true)
  })
})

describe('app-detail thunks', () => {
  describe('appDetailDataListen', () => {
    it('should trigger request data when called', () => {
      const gen = appDetailDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<String>>(ActionTypes.APP_DETAIL_REQUEST_DATA, appDetailDataFetch)
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
