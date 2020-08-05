import { call, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchAppRevisionListSuccess, fetchAppRevisionList } from '@/actions/apps/app-revision-list'
import appListSagas, { fetchAppRevisionListSaga, fetchAppRevisionListListen } from '../app-revision-list'
import { fetchAppRevisionsList, FetchAppRevisionsListParams } from '@/services/apps'
import { Action } from '@/types/core'
import { revisionsDataStub } from '@/sagas/__stubs__/revisions'

jest.mock('@/services/apps')

jest.mock('@reapit/elements')

const params: Action<FetchAppRevisionsListParams> = {
  data: {
    id: 'test',
  },
  type: 'FETCH_APP_REVISION_LIST',
}

describe('fetchAppRevisionListSaga', () => {
  describe('fetchAppRevisionListSaga', () => {
    const gen = cloneableGenerator(fetchAppRevisionListSaga)(params)
    expect(gen.next().value).toEqual(
      call(fetchAppRevisionsList, {
        id: params.data.id,
      }),
    )
    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(revisionsDataStub).value).toEqual(put(fetchAppRevisionListSuccess(revisionsDataStub)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchAppRevisionListListen', () => {
    it('should request data listen', () => {
      const gen = fetchAppRevisionListListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchAppRevisionsListParams>>(fetchAppRevisionList.type, fetchAppRevisionListSaga),
      )
      expect(gen.next().done).toBe(true)
    })
  })
  describe('developerSagas', () => {
    it('should listen developer request data & create app action', () => {
      const gen = appListSagas()
      expect(gen.next().value).toEqual(all([fork(fetchAppRevisionListListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
