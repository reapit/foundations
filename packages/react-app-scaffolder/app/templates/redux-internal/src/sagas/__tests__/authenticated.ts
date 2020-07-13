import authenticatedSagas, { authenticatedDataFetch, authenticatedDataListen } from '../authenticated'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { authenticatedLoading, authenticatedReceiveData } from '@/actions/authenticated'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'

describe('authenticated fetch data', () => {
  const gen = cloneableGenerator(authenticatedDataFetch)()

  expect(gen.next().value).toEqual(put(authenticatedLoading(true)))
  expect(gen.next().value).toEqual(true)

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(authenticatedReceiveData({})))
    expect(clone.next().done).toBe(true)
  })
})

describe('authenticated sagas', () => {
  describe('authenticatedListen', () => {
    it('should request data when called', () => {
      const gen = authenticatedDataListen()

      expect(gen.next().value).toEqual(
        takeLatest<Action<number>>(ActionTypes.AUTHENTICATED_REQUEST_DATA, authenticatedDataFetch),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('authenticatedSagas', () => {
    it('should listen data request', () => {
      const gen = authenticatedSagas()

      expect(gen.next().value).toEqual(all([fork(authenticatedDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
