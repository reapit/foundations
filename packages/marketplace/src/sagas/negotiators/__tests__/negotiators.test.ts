import { cloneableGenerator } from '@redux-saga/testing-utils'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { negotiatorsSagas, fetchNegotiators, fetchNegotiatorsListen } from '@/sagas/negotiators'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { fetchNegotiatorsApi, FetchNegotiatorsParams } from '@/services/negotiators'
import { fetchNegotiatorsFailed, fetchNegotiatorsSuccess } from '@/actions/negotiators'
import { negotiatorsStub } from '@/sagas/__stubs__/negotiators'

describe('negotiators', () => {
  const params = {
    data: {
      pageNumber: 1,
      pageSize: 10,
    },
    type: ActionTypes.FETCH_CATEGORIES as string,
  } as Action<FetchNegotiatorsParams>

  describe('fetchNegotiators', () => {
    const gen = cloneableGenerator(fetchNegotiators)(params)
    expect(gen.next().value).toEqual(call(fetchNegotiatorsApi, { ...params.data }))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(negotiatorsStub).value).toEqual(put(fetchNegotiatorsSuccess(negotiatorsStub)))
      expect(clone.next().done).toBe(true)
    })

    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchNegotiatorsFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchNegotiatorsListen', () => {
    it('should trigger request data when called', () => {
      const gen = fetchNegotiatorsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchNegotiatorsParams>>(ActionTypes.FETCH_NEGOTIATORS, fetchNegotiators),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('negotiatorsSagas', () => {
    it('should listen data request', () => {
      const gen = negotiatorsSagas()
      expect(gen.next().value).toEqual(all([fork(fetchNegotiatorsListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
