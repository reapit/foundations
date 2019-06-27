import clientSagas, { clientDataFetch, clientDataListen, mockClientData } from '../client'
import ActionTypes from '@/constants/action-types'
import { delay, put, takeLatest, all, fork } from '@redux-saga/core/effects'
import { clientLoading, clientReceiveData } from '@/actions/client'

describe('client thunks', () => {
  describe('clientDataFetch', () => {
    it('should trigger loading, call api then return data', () => {
      const gen = clientDataFetch()

      expect(gen.next().value).toEqual(put(clientLoading(true)))
      expect(gen.next().value).toEqual(delay(1000))
      expect(gen.next().value).toEqual(put(clientReceiveData(mockClientData)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('clientDataListen', () => {
    it('should trigger loading', () => {
      const gen = clientDataListen()

      expect(gen.next().value).toEqual(takeLatest(ActionTypes.CLIENT_REQUEST_DATA, clientDataFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('clientSagas', () => {
    it('should trigger loading', () => {
      const gen = clientSagas()

      expect(gen.next().value).toEqual(all([fork(clientDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
