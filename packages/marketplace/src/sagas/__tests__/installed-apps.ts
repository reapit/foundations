import installedAppsSagas, {
  installedAppsDataFetch,
  installedAppsDataListen,
  fetchInstalledApps
} from '../installed-apps'
import { appsDataStub } from '../__stubs__/apps'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  installedAppsLoading,
  installedAppsReceiveData,
  installedAppsRequestDataFailure
} from '@/actions/installed-apps'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import { selectClientId } from '@/selector/client'

jest.mock('@reapit/elements')

const params = { data: 1 }

describe('installed-apps fetch data', () => {
  const gen = cloneableGenerator(installedAppsDataFetch)(params)
  const clientId = 'DAC'

  expect(gen.next().value).toEqual(put(installedAppsLoading(true)))
  expect(gen.next().value).toEqual(select(selectClientId))
  expect(gen.next(clientId).value).toEqual(
    call(fetchInstalledApps, {
      clientId,
      page: params.data
    })
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
  expect(gen.next().value).toEqual(select(selectClientId))

  expect((gen as { throw: any }).throw(new Error('Client id is not exists')).value).toEqual(
    put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  )
})

describe('installed-apps thunks', () => {
  describe('installedAppsDataListen', () => {
    it('should request data when called', () => {
      const gen = installedAppsDataListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.INSTALLED_APPS_REQUEST_DATA, installedAppsDataFetch)
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
