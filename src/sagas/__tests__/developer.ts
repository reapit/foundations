import developerSagas, {
  developerDataFetch,
  developerDataListen,
  mockDeveloperData,
  developerCreate
} from '../developer'
import ActionTypes from '@/constants/action-types'
import { delay, put, takeLatest, all, fork, takeEvery } from '@redux-saga/core/effects'
import { developerLoading, developerReceiveData } from '@/actions/developer'

jest.mock('../../utils/fetcher')

describe('developer thunks', () => {
  describe('developerDataFetch', () => {
    it('should trigger loading, call api then return data', () => {
      const gen = developerDataFetch()
      expect(gen.next().value).toEqual(put(developerLoading(true)))
      expect(gen.next().value).toEqual(delay(1000))
      expect(gen.next().value).toEqual(put(developerReceiveData(mockDeveloperData)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerDataListen', () => {
    it('should trigger loading', () => {
      const gen = developerDataListen()

      expect(gen.next().value).toEqual(takeLatest(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch))
      expect(gen.next().value).toEqual(takeEvery(ActionTypes.DEVELOPER_CREATE, developerCreate))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('developerSagas', () => {
    it('should trigger loading', () => {
      const gen = developerSagas()

      expect(gen.next().value).toEqual(all([fork(developerDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
