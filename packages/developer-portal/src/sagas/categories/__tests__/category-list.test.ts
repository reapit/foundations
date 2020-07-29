import { call, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import categoryListSagas, { fetchCategoryListSaga, fetchCategoryListListen } from '../category-list'
import { Action } from '@/types/core'
import { fetchCategoryListAPI } from '@/services/categories'
import { fetchCategoryListSuccess, fetchCategoryList } from '@/actions/categories'
import { categoriesStub } from '@/sagas/__stubs__/app-categories'

jest.mock('@/services/categories')

jest.mock('@reapit/elements')

describe('fetchCategoryListSaga', () => {
  describe('fetchCategoryListSaga', () => {
    const gen = cloneableGenerator(fetchCategoryListSaga)()
    expect(gen.next().value).toEqual(call(fetchCategoryListAPI, {}))
    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(categoriesStub).value).toEqual(put(fetchCategoryListSuccess(categoriesStub)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchCategoryListListen', () => {
    it('should request data listen', () => {
      const gen = fetchCategoryListListen()

      expect(gen.next().value).toEqual(takeLatest<Action<void>>(fetchCategoryList.type, fetchCategoryListSaga))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerSagas', () => {
    it('should listen developer request data & create scope action', () => {
      const gen = categoryListSagas()
      expect(gen.next().value).toEqual(all([fork(fetchCategoryListListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
