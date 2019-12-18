import myAppsSagas, { myAppsDataFetch, myAppsDataListen } from '../my-apps'
import { appsDataStub } from '../__stubs__/apps'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { myAppsLoading, myAppsReceiveData, myAppsRequestDataFailure } from '@/actions/my-apps'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { APPS_PER_PAGE } from '@/constants/paginator'
import errorMessages from '@/constants/error-messages'
import { selectClientId } from '@/selector/client'
import { errorThrownServer } from '@/actions/error'

jest.mock('@reapit/elements')
const params = { data: 1 }

describe('my-apps fetch data', () => {
  const gen = cloneableGenerator(myAppsDataFetch)(params)
  const clientId = 'DAC'

  expect(gen.next().value).toEqual(put(myAppsLoading(true)))
  expect(gen.next().value).toEqual(select(selectClientId))
  expect(gen.next(clientId).value).toEqual(
    call(fetcher, {
      url: `${URLS.apps}?clientId=${clientId}&OnlyInstalled=true&PageNumber=${params.data}&PageSize=${APPS_PER_PAGE}`,
      api: process.env.MARKETPLACE_API_BASE_URL as string,
      method: 'GET',
      headers: MARKETPLACE_HEADERS
    })
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(myAppsReceiveData(appsDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(myAppsRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('my-apps fetch data error', () => {
  const gen = cloneableGenerator(myAppsDataFetch)(params)

  expect(gen.next().value).toEqual(put(myAppsLoading(true)))
  expect(gen.next().value).toEqual(select(selectClientId))

  // @ts-ignore
  expect(gen.throw(new Error('Client id is not exists')).value).toEqual(
    put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  )
})

describe('my-apps thunks', () => {
  describe('myAppsDataListen', () => {
    it('should request data when called', () => {
      const gen = myAppsDataListen()
      expect(gen.next().value).toEqual(takeLatest<Action<number>>(ActionTypes.MY_APPS_REQUEST_DATA, myAppsDataFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('myAppsSagas', () => {
    it('should listen request data', () => {
      const gen = myAppsSagas()

      expect(gen.next().value).toEqual(all([fork(myAppsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
