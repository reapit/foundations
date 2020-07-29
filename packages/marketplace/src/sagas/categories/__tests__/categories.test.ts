import { cloneableGenerator } from '@redux-saga/testing-utils'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { categoriesSagas, fetchCategories, fetchCategoriesListen } from '@/sagas/categories'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { fetchCategoriesApi, FetchCategoriesParams } from '@/services/categories'
import { fetchCategoriesFailure, fetchCategoriesSuccess } from '@/actions/categories'
import { categoriesStub } from '@/sagas/__stubs__/categories'

describe('categories', () => {
  const params = {
    data: {
      pageNumber: 1,
      pageSize: 10,
    },
    type: ActionTypes.FETCH_CATEGORIES as string,
  } as Action<FetchCategoriesParams>

  describe('fetchCategories', () => {
    const gen = cloneableGenerator(fetchCategories)(params)
    expect(gen.next().value).toEqual(call(fetchCategoriesApi, { ...params.data }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(categoriesStub).value).toEqual(put(fetchCategoriesSuccess(categoriesStub)))
      expect(clone.next().done).toBe(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchCategoriesFailure(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchCategoriesListen', () => {
    it('should trigger request data when called', () => {
      const gen = fetchCategoriesListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchCategoriesParams>>(ActionTypes.FETCH_CATEGORIES, fetchCategories),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('categoriesSagas', () => {
    it('should listen data request', () => {
      const gen = categoriesSagas()
      expect(gen.next().value).toEqual(all([fork(fetchCategoriesListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
