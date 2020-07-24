import myAppsSagas, { myAppsDataFetch, myAppsDataListen } from '../my-apps'
import { appsDataStub } from '../__stubs__/apps'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { myAppsLoading, myAppsReceiveData, myAppsRequestDataFailure } from '@/actions/my-apps'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { APPS_PER_PAGE } from '@/constants/paginator'
import errorMessages from '@/constants/error-messages'
import { selectDeveloperEditionId } from '@/selector/client'
import { errorThrownServer } from '@/actions/error'
import { fetchAppsList } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientIdFromHook } from '@/selector/auth'
import { ReapitConnectSession } from '@reapit/connect-session'
// FIXME: import mock browser session
// log

jest.mock('@/services/apps')
jest.mock('@reapit/elements')
const params = { data: 1 }
const connectSession = 'connectSession'

describe('my-apps fetch data', () => {
  const gen = cloneableGenerator(myAppsDataFetch)(params)
  const clientId = 'DAC'
  const developerId = '1234'
  // FIXME: mock browser session
  // test no fail

  expect(gen.next().value).toEqual(put(myAppsLoading(true)))
  //
  expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
  expect(gen.next(connectSession).value).toEqual(
    call(selectClientIdFromHook, (connectSession as unknown) as ReapitConnectSession),
  )
  ///
  expect(gen.next(clientId).value).toEqual(select(selectDeveloperEditionId))
  expect(gen.next(developerId).value).toEqual(
    call(fetchAppsList, {
      clientId,
      developerId: [developerId],
      onlyInstalled: true,
      pageNumber: params.data,
      pageSize: APPS_PER_PAGE,
    }),
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
  expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
  expect(gen.next(connectSession).value).toEqual(
    call(selectClientIdFromHook, (connectSession as unknown) as ReapitConnectSession),
  )

  expect(gen.next().value).toEqual(
    put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    ),
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
