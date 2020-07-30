import { call, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import desktopIntegrationTypeListSagas, {
  fetchDesktopIntegrationTypeListSaga,
  fetchDesktopIntegrationTypeListListen,
} from '../desktop-integration-type-list'
import { Action } from '@/types/core'
import { fetchDesktopIntegrationTypeListAPI } from '@/services/desktop-integration-types'
import {
  fetchDesktopIntegrationTypeListSuccess,
  fetchDesktopIntegrationTypeList,
} from '@/actions/desktop-integration-types'
import { integrationTypesStub } from '@/sagas/__stubs__/integration-types'

jest.mock('@/services/desktop-integration-types')

jest.mock('@reapit/elements')

describe('fetchDesktopIntegrationTypeListSaga', () => {
  describe('fetchDesktopIntegrationTypeListSaga', () => {
    const gen = cloneableGenerator(fetchDesktopIntegrationTypeListSaga)()
    expect(gen.next().value).toEqual(call(fetchDesktopIntegrationTypeListAPI, {}))
    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(integrationTypesStub).value).toEqual(
        put(fetchDesktopIntegrationTypeListSuccess(integrationTypesStub)),
      )
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchDesktopIntegrationTypeListListen', () => {
    it('should request data listen', () => {
      const gen = fetchDesktopIntegrationTypeListListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<void>>(fetchDesktopIntegrationTypeList.type, fetchDesktopIntegrationTypeListSaga),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerSagas', () => {
    it('should listen developer request data & create scope action', () => {
      const gen = desktopIntegrationTypeListSagas()
      expect(gen.next().value).toEqual(all([fork(fetchDesktopIntegrationTypeListListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
