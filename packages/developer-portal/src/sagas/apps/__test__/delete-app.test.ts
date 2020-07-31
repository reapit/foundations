import { notification } from '@reapit/elements'

import ActionTypes from '@/constants/action-types'
import errorMessages from '@/constants/error-messages'
import { fork, all, call, takeLatest, put } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { deleteAppById, DeleteAppByIdParams } from '@/services/apps'
import deleteAppSagas, { deleteAppSaga, deleteAppSagaListen } from '../delete-app'
import { deleteAppFailed, deleteAppSuccess } from '@/actions/apps'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')

export const params: Action<DeleteAppByIdParams> = {
  data: {
    id: 'id',
  },
  type: 'DELETE_APP',
}

describe('delete-app post data', () => {
  const gen = cloneableGenerator(deleteAppSaga)(params)
  expect(gen.next('id').value).toEqual(call(deleteAppById, { id: 'id' }))

  test('api call success', () => {
    const clone = gen.clone()
    expect(clone.next().value).toEqual(put(deleteAppSuccess()))
    expect(clone.next().done).toBe(true)
  })

  test('api call fail', () => {
    const clone = gen.clone()
    if (clone.throw) {
      expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(deleteAppFailed()))
      expect(clone.next().value).toEqual(
        notification.error({
          message: errorMessages.DEFAULT_SERVER_ERROR,
          placement: 'bottomRight',
        }),
      )
      expect(clone.next().done).toBe(true)
    }
  })

  describe('delete-app thunks', () => {
    describe('deleteAppSagaListen', () => {
      it('should delete data when called', () => {
        const gen = deleteAppSagaListen()
        expect(gen.next().value).toEqual(takeLatest<Action<DeleteAppByIdParams>>(ActionTypes.DELETE_APP, deleteAppSaga))
        expect(gen.next().done).toBe(true)
      })
    })

    describe('deleteAppSagas', () => {
      it('should listen saga', () => {
        const gen = deleteAppSagas()
        expect(gen.next().value).toEqual(all([fork(deleteAppSagaListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
