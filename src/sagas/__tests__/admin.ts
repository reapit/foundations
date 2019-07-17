import adminSagas, { appRevisionsFetch, appRevisionsDataListen, mockMyAppRevisions } from '../admin'
import ActionTypes from '@/constants/action-types'
import { delay, put, takeLatest, all, fork, takeEvery } from '@redux-saga/core/effects'
import { adminLoading, adminReceiveRevisions } from '@/actions/admin'

jest.mock('../../utils/fetcher')

describe('admin sagas', () => {
  describe('appRevisionsFetch', () => {
    it('should trigger loading, call api then return data', () => {
      const gen = appRevisionsFetch()
      expect(gen.next().value).toEqual(put(adminLoading(true)))
      expect(gen.next().value).toEqual(delay(1000))
      expect(gen.next().value).toEqual(put(adminReceiveRevisions(mockMyAppRevisions)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appRevisionsDataListen', () => {
    it('should trigger loading', () => {
      const gen = appRevisionsDataListen()

      expect(gen.next().value).toEqual(takeLatest(ActionTypes.ADMIN_REQUEST_REVISIONS, appRevisionsFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('adminSagas', () => {
    it('should trigger loading', () => {
      const gen = adminSagas()

      expect(gen.next().value).toEqual(all([fork(appRevisionsDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
