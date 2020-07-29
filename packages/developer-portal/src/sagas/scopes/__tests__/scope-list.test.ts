import { call, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import scopeListSagas, { fetchScopeListSaga, fetchScopeListListen } from '../scope-list'
import { Action } from '@/types/core'
import { fetchScopeListAPI } from '@/services/scopes'
import { scopesListStub } from '@/sagas/__stubs__/scopes'
import { fetchScopeListSuccess, fetchScopeList } from '@/actions/scopes'

jest.mock('@/services/scopes')

jest.mock('@reapit/elements')

describe('fetchScopeListSaga', () => {
  describe('fetchScopeListSaga', () => {
    const gen = cloneableGenerator(fetchScopeListSaga)()
    expect(gen.next().value).toEqual(call(fetchScopeListAPI))
    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(scopesListStub).value).toEqual(put(fetchScopeListSuccess(scopesListStub)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchScopeListListen', () => {
    it('should request data listen', () => {
      const gen = fetchScopeListListen()

      expect(gen.next().value).toEqual(takeLatest<Action<void>>(fetchScopeList.type, fetchScopeListSaga))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerSagas', () => {
    it('should listen developer request data & create scope action', () => {
      const gen = scopeListSagas()
      expect(gen.next().value).toEqual(all([fork(fetchScopeListListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
