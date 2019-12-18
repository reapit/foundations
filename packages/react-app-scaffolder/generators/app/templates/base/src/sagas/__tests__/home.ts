import homeSagas, { homeDataFetch, homeDataListen } from '../home'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { homeLoading, homeReceiveData, homeRequestDataFailure } from '@/actions/home'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { Action } from '@/types/core'

describe('home fetch data', () => {
  const gen = cloneableGenerator(homeDataFetch)()

  expect(gen.next().value).toEqual(put(homeLoading(true)))
  expect(gen.next().value).toEqual(true)

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(homeReceiveData({})))
    expect(clone.next().done).toBe(true)
  })
})

describe('home sagas', () => {
  describe('homeListen', () => {
    it('should request data when called', () => {
      const gen = homeDataListen()

      expect(gen.next().value).toEqual(takeLatest<Action<number>>(ActionTypes.HOME_REQUEST_DATA, homeDataFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('homeSagas', () => {
    it('should listen data request', () => {
      const gen = homeSagas()

      expect(gen.next().value).toEqual(all([fork(homeDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
