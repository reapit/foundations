import { call, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchAppListSuccess, fetchAppList } from '@/actions/apps/app-list'
import appListSagas, { fetchAppListSaga, fetchAppListListen } from '../app-list'
import { APPS_PER_PAGE } from '@/constants/paginator'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { fetchAppsListAPI } from '@/services/apps'
import { Action } from '@/types/core'
import { FetchAppListParams } from '@/reducers/apps/app-list'
import { getDeveloperId } from '@/utils/session'

jest.mock('@/services/apps')

jest.mock('@reapit/elements')

const params = { data: { page: 1 } }

describe('fetchAppListSaga', () => {
  describe('fetchAppListSaga', () => {
    const developerId = '72ad4ed6-0df0-4a28-903c-55899cffee85'
    const gen = cloneableGenerator(fetchAppListSaga)(params)
    expect(gen.next().value).toEqual(call(getDeveloperId))
    expect(gen.next(developerId).value).toEqual(
      call(fetchAppsListAPI, { developerId: [developerId], pageNumber: params.data.page, pageSize: APPS_PER_PAGE }),
    )
    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(appsDataStub.data).value).toEqual(put(fetchAppListSuccess(appsDataStub.data)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchAppListListen', () => {
    it('should request data listen', () => {
      const gen = fetchAppListListen()

      expect(gen.next().value).toEqual(takeLatest<Action<FetchAppListParams>>(fetchAppList.type, fetchAppListSaga))
      expect(gen.next().done).toBe(true)
    })
  })
  describe('developerSagas', () => {
    it('should listen developer request data & create app action', () => {
      const gen = appListSagas()
      expect(gen.next().value).toEqual(all([fork(fetchAppListListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
