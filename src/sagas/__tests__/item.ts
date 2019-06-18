import itemSagas, { itemDataFetch, itemDataListen } from '../item'
import ActionTypes from '../../constants/action-types'
import fetcher from '../../utils/fetcher'
import { URLS } from '../../constants/api'
import { call, put, takeEvery, all, fork } from '@redux-saga/core/effects'
import { itemLoading, itemReceiveData } from '../../actions/item'

describe('item thunks', () => {
  describe('itemDataFetch', () => {
    it('should trigger loading, call api then return data', () => {
      const gen = itemDataFetch()

      expect(gen.next().value).toEqual(put(itemLoading(true)))
      expect(gen.next().value).toEqual(call(fetcher, { url: URLS.node, method: 'GET' }))
      expect(gen.next().value).toEqual(put(itemReceiveData(undefined)))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('itemDataListen', () => {
    it('should trigger loading', () => {
      const gen = itemDataListen()

      expect(gen.next().value).toEqual(takeEvery(ActionTypes.ITEM_REQUEST_DATA, itemDataFetch))
      expect(gen.next().done).toBe(true)
    })
  })

  describe('itemSagas', () => {
    it('should trigger loading', () => {
      const gen = itemSagas()

      expect(gen.next().value).toEqual(all([fork(itemDataListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
