import { notification } from '@reapit/elements'

import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { fork, all, call, takeLatest, put } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { rejectAppRevisionById, RejectAppRevisionByIdParams } from '@/services/apps'
import declineAppRevisionSagas, { declineAppRevisionSaga, declineAppRevisionSagaListen } from '../decline-app-revision'
import { declineAppRevisionFailed, declineAppRevisionSuccess } from '@/actions/apps'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')

export const params: Action<RejectAppRevisionByIdParams> = {
  data: {
    id: 'id',
    revisionId: 'id',
  },
  type: 'DECLINE_APP_REVISION',
}

describe('decline revision app post data', () => {
  const gen = cloneableGenerator(declineAppRevisionSaga)(params)
  expect(gen.next('id').value).toEqual(call(rejectAppRevisionById, { id: 'id', revisionId: 'id' }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(declineAppRevisionSuccess()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(declineAppRevisionFailed()))
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })

  describe('decline revision app thunks', () => {
    describe('declineAppRevisionSagaListen', () => {
      it('should decline a revision when called', () => {
        const gen = declineAppRevisionSagaListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<RejectAppRevisionByIdParams>>(ActionTypes.DECLINE_APP_REVISION, declineAppRevisionSaga),
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('declineAppRevisionSagas', () => {
      it('should listen saga', () => {
        const gen = declineAppRevisionSagas()
        expect(gen.next().value).toEqual(all([fork(declineAppRevisionSagaListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
