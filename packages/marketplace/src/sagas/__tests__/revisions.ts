import revisionsSagas, { appRevisionsSaga, appRevisionsListen, fetchAppRevisions } from '../revisions'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { revisionsReceiveData, revisionsRequestDataFailure, RevisionsRequestParams } from '@/actions/revisions'
import { revisionsDataStub } from '../__stubs__/revisions'
import { Action } from '@/types/core'

const revisionsRequestParams = {
  data: {
    appId: '1',
  },
}

describe('app-installations sagas', () => {
  describe('installationsFetchData', () => {
    const gen = cloneableGenerator(appRevisionsSaga)(revisionsRequestParams)
    expect(gen.next().value).toEqual(call(fetchAppRevisions, revisionsRequestParams.data))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(revisionsDataStub).value).toEqual(put(revisionsReceiveData(revisionsDataStub)))
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(new Error('')).value).toEqual(put(revisionsRequestDataFailure()))
        expect(clone.next().value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
        )
      }
      expect(clone.next().done).toBe(true)
    })
  })

  describe('revisions thunks', () => {
    describe('revisionsListen', () => {
      it('should trigger saga function when called', () => {
        const gen = appRevisionsListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<RevisionsRequestParams>>(ActionTypes.REVISIONS_REQUEST_DATA, appRevisionsSaga),
        )

        expect(gen.next().done).toBe(true)
      })
    })

    describe('appUsageStatsSagas', () => {
      it('should listen data request', () => {
        const gen = revisionsSagas()

        expect(gen.next().value).toEqual(all([fork(appRevisionsListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
