import { requestDeleteAppSaga, requestDeleteAppListen } from '../app-delete'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, call } from '@redux-saga/core/effects'
import { requestDeleteAppSuccess, requestDeleteAppLoading, requestDeleteAppFailed } from '@/actions/app-delete'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { appsReceiveData } from '@/actions/apps-management'
import { deleteAppById, fetchAppsList } from '@/services/apps'

jest.mock('@/services/apps')
jest.mock('@reapit/elements')

const params: Action<string> = {
  data: '1',
  type: 'DELETE_REQUEST_APP',
}

describe('app-delete sagas', () => {
  describe('app-delete request', () => {
    const gen = cloneableGenerator(requestDeleteAppSaga)(params)

    expect(gen.next().value).toEqual(put(requestDeleteAppLoading()))
    expect(gen.next().value).toEqual(call(deleteAppById, { id: '1' }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(true).value).toEqual(call(fetchAppsList, {}))
      expect(clone.next({}).value).toEqual(put(appsReceiveData({})))
      expect(clone.next().value).toEqual(put(requestDeleteAppSuccess()))
      expect(clone.next().done).toEqual(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(put(requestDeleteAppFailed()))
        expect(clone.next().value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR,
            }),
          ),
        )
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
