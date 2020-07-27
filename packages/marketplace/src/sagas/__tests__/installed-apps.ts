import installedAppsSagas, { installedAppsDataFetch, installedAppsDataListen } from '../installed-apps'
import { appsDataStub } from '../__stubs__/apps'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import {
  installedAppsLoading,
  installedAppsReceiveData,
  installedAppsRequestDataFailure,
} from '@/actions/apps'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { selectDeveloperEditionId } from '@/selector/client'
import { fetchAppsList } from '@/services/apps'
import { INSTALLED_APPS_PERPAGE } from '@/constants/paginator'
import { selectClientId } from '@/selector/auth'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')

const params = { data: 1 }
const connectSession = 'connectSession'

describe('installed-apps fetch data', () => {
  const gen = cloneableGenerator(installedAppsDataFetch)(params)
  const clientId = 'DAC'
  const developerId = '1234'

  expect(gen.next().value).toEqual(put(installedAppsLoading(true)))

  expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
  expect(gen.next(connectSession).value).toEqual(
    call(selectClientId, (connectSession as unknown) as ReapitConnectSession),
  )

  expect(gen.next(clientId).value).toEqual(
    call(selectDeveloperEditionId, (connectSession as unknown) as ReapitConnectSession),
  )
  expect(gen.next(developerId).value).toEqual(
    call(fetchAppsList, {
      clientId,
      developerId: [developerId],
      pageNumber: params.data,
      pageSize: INSTALLED_APPS_PERPAGE,
      onlyInstalled: true,
      isDirectApi: false,
    }),
  )

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next(appsDataStub.data).value).toEqual(put(installedAppsReceiveData(appsDataStub)))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    expect(clone.next(undefined).value).toEqual(put(installedAppsRequestDataFailure()))
    expect(clone.next().done).toBe(true)
  })
})

describe('installed-apps fetch data error', () => {
  const gen = cloneableGenerator(installedAppsDataFetch)(params)

  expect(gen.next().value).toEqual(put(installedAppsLoading(true)))
  expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
  expect(gen.next(connectSession).value).toEqual(
    call(selectClientId, (connectSession as unknown) as ReapitConnectSession),
  )

  if (!gen.throw) throw new Error('Generator object cannot throw')
  expect(gen.throw('Client id is not exists').value).toEqual(
    put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR,
      }),
    ),
  )
})

describe('installed-apps thunks', () => {
  describe('installedAppsDataListen', () => {
    it('should request data when called', () => {
      const gen = installedAppsDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.INSTALLED_APPS_REQUEST_DATA, installedAppsDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('installedAppsSagas', () => {
    it('should listen request data', () => {
      const gen = installedAppsSagas()

      expect(gen.next().value).toEqual(all([fork(installedAppsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
