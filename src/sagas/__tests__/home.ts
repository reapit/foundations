import homeSagas, { homeDataFetch, homeDataListen } from '../home'
import ActionTypes from '../../constants/action-types'
import fetcher from '../../utils/fetcher'
import { URLS } from '../../constants/api'
import { call, put, takeEvery, all, fork } from '@redux-saga/core/effects'
import { homeLoading, homeReceiveData } from '../../actions/home'

describe('home thunks', () => {
  describe('homeDataFetch', () => {
    it('should trigger loading, call api then return data', () => {
      const gen = homeDataFetch()

      expect(gen.next().value).toEqual(put(homeLoading(true)))
      expect(gen.next().value).toEqual(call(fetcher, { url: URLS.react, method: 'GET' }))
      expect(gen.next().value).toEqual(put(homeReceiveData(undefined)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('homeDataListen', () => {
    it('should trigger loading', () => {
      const gen = homeDataListen()

      expect(gen.next().value).toEqual(takeEvery(ActionTypes.HOME_REQUEST_DATA, homeDataFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('homeSagas', () => {
    it('should trigger loading', () => {
      const gen = homeSagas()

      expect(gen.next().value).toEqual(all([fork(homeDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
