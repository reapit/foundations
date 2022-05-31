import { requestDeleteAppSaga, requestDeleteAppListen } from '../app-delete'
import { errorMessages } from '@reapit/utils-common'

import ActionTypes from '@/constants/action-types'
import { put, takeLatest, call } from '@redux-saga/core/effects'
import { requestDeleteAppSuccess, requestDeleteAppFailed } from '@/actions/app-delete'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { fetchAppListSuccess } from '@/actions/apps-management'
import { deleteAppById, fetchAppsList } from '@/services/apps'
import { notification } from '@reapit/elements-legacy'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')
jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

const params: Action<string> = {
  data: '1',
  type: 'DELETE_REQUEST_APP',
}

describe('app-delete sagas', () => {
  describe('app-delete request', () => {
    const gen = cloneableGenerator(requestDeleteAppSaga)(params)

    expect(gen.next().value).toEqual(call(deleteAppById, { id: '1' }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(true).value).toEqual(call(fetchAppsList, {}))
      expect(clone.next({}).value).toEqual(put(fetchAppListSuccess({})))
      expect(clone.next().value).toEqual(put(requestDeleteAppSuccess()))
      expect(clone.next().done).toEqual(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
          call(notification.error, {
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        )
        expect(clone.next().value).toEqual(put(requestDeleteAppFailed()))
        expect(clone.next().done).toBe(true)
      }
    })
  })

  describe('app-delete thunks', () => {
    describe('requestDeleteAppDataListen', () => {
      it('should trigger app delete when called', () => {
        const gen = requestDeleteAppListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<string>>(ActionTypes.DELETE_REQUEST_APP, requestDeleteAppSaga),
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
