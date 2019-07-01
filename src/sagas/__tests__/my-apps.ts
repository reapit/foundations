import myAppsSagas, { myAppsDataFetch, myAppsDataListen, mockMyAppsData } from '../my-apps'
import ActionTypes from '@/constants/action-types'
import { delay, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { myAppsLoading, myAppsReceiveData } from '@/actions/my-apps'

describe('my-apps thunks', () => {
  describe('myAppsDataFetch', () => {
    it('should trigger loading, call api then return data', () => {
      const gen = myAppsDataFetch()

      expect(gen.next().value).toEqual(put(myAppsLoading(true)))
      expect(gen.next().value).toEqual(delay(1000))
      expect(gen.next().value).toEqual(put(myAppsReceiveData(mockMyAppsData)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('myAppsDataListen', () => {
    it('should trigger loading', () => {
      const gen = myAppsDataListen()

      expect(gen.next().value).toEqual(takeLatest(ActionTypes.MY_APPS_REQUEST_DATA, myAppsDataFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('myAppsSagas', () => {
    it('should trigger loading', () => {
      const gen = myAppsSagas()

      expect(gen.next().value).toEqual(all([fork(myAppsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
