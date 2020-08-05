import {
  fetchInstallationsFilterListSaga,
  fetchInstallationsFilterListListen,
  fetchInstallationsFilterListSagas,
} from '../filter-list'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { getDeveloperId } from '@/utils/session'
import { fetchInstallationsList, FetchInstallationsListParams } from '@/services/installations'
import { call, put, all, fork, takeLatest } from 'redux-saga/effects'
import { installationsStub } from '../__stubs__/installations'
import { fetchInstallationsFilterListFailed, fetchInstallationsFilterListSuccess } from '@/actions/installations'
import errorMessages from '@/constants/error-messages'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'

describe('fetchInstallationsListSaga sagas', () => {
  const installationsParams = {
    data: {
      appId: ['1'],
    },
  }

  describe('fetchInstallationsFilterListSaga', () => {
    const gen = cloneableGenerator(fetchInstallationsFilterListSaga)(installationsParams)
    expect(gen.next().value).toEqual(getDeveloperId())
    expect(gen.next().value).toEqual(call(fetchInstallationsList, { ...installationsParams.data }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(installationsStub).value).toEqual(put(fetchInstallationsFilterListSuccess(installationsStub)))
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(fetchInstallationsFilterListFailed()))
      }
      expect(clone.next().done).toBe(true)
    })
  })
})

describe('fetchInstallationsFilterListListen', () => {
  it('should trigger saga function when called', () => {
    const gen = fetchInstallationsFilterListListen()
    expect(gen.next().value).toEqual(
      takeLatest<Action<FetchInstallationsListParams>>(
        ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST,
        fetchInstallationsFilterListSaga,
      ),
    )

    expect(gen.next().done).toBe(true)
  })
})

describe('fetchInstallationsFilterListSagas', () => {
  it('should listen', () => {
    const gen = fetchInstallationsFilterListSagas()

    expect(gen.next().value).toEqual(all([fork(fetchInstallationsFilterListListen)]))
    expect(gen.next().done).toBe(true)
  })
})
