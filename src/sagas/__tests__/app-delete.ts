import { appDeleteRequestSaga, appDeleteRequestListen } from '../app-delete'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, call, select } from '@redux-saga/core/effects'
import { appDeleteRequestSuccess, appDeleteRequestLoading, appDeleteRequestFailure } from '@/actions/app-delete'
import { selectAppDetailId } from '@/selector/app-detail'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { developerRequestData } from '@/actions/developer'
import { developerAppShowModal } from '@/actions/developer-app-modal'

jest.mock('@reapit/elements')

const params: Action<string> = {
  data: '1',
  type: 'APP_DELETE_REQUEST'
}

describe('app-delete sagas', () => {
  describe('app-delete request', () => {
    const gen = cloneableGenerator(appDeleteRequestSaga)(params)

    expect(gen.next().value).toEqual(put(appDeleteRequestLoading()))
    expect(gen.next().value).toEqual(
      call(fetcher, {
        url: `${URLS.apps}/1`,
        api: REAPIT_API_BASE_URL,
        method: 'DELETE',
        headers: MARKETPLACE_HEADERS
      })
    )

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appDeleteRequestSuccess()))
      expect(clone.next().done).toEqual(true)
    })

    test('api call fail', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(new Error('')).value).toEqual(put(appDeleteRequestFailure()))
        expect(clone.next().value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
        expect(clone.next().done).toBe(true)
      }
    })
  })

  describe('app-delete thunks', () => {
    describe('appDeleteRequestDataListen', () => {
      it('should trigger app delete when called', () => {
        const gen = appDeleteRequestListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<string>>(ActionTypes.APP_DELETE_REQUEST, appDeleteRequestSaga)
        )
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
