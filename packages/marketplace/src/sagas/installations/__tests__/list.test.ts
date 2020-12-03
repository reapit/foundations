import { fetchInstallationsListSaga, fetchInstallationsListListen, installationsListSagas } from '../list'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchInstallationsList, FetchInstallationsListParams } from '@/services/installations'
import { call, put, all, fork, takeLatest } from 'redux-saga/effects'
import { fetchInstallationsListSuccess, fetchInstallationsListFailed } from '@/actions/installations'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { installationsStub } from '../../__stubs__/installations'

describe('fetchInstallationsListSaga sagas', () => {
  const installationsParams = {
    data: {
      appId: ['1'],
    },
  }

  describe('fetchInstallationsListSaga', () => {
    const gen = cloneableGenerator(fetchInstallationsListSaga)(installationsParams)
    expect(gen.next().value).toEqual(call(fetchInstallationsList, { ...installationsParams.data }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(installationsStub).value).toEqual(put(fetchInstallationsListSuccess(installationsStub)))
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(fetchInstallationsListFailed()))
      }
      expect(clone.next().done).toBe(true)
    })
  })
})

describe('fetchInstallationsListListen', () => {
  it('should trigger saga function when called', () => {
    const gen = fetchInstallationsListListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchInstallationsListParams>>(
        ActionTypes.FETCH_INSTALLATIONS_LIST,
        fetchInstallationsListSaga,
      ),
    )

    expect(gen.next().done).toBe(true)
  })
})

describe('installationsListSagas', () => {
  it('should listen', () => {
    const gen = installationsListSagas()

    expect(gen.next().value).toEqual(all([fork(fetchInstallationsListListen)]))
    expect(gen.next().done).toBe(true)
  })
})
