import appInstallSagas, { appInstallDataListen, appInstallSaga } from '../app-install'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { appInstallRequestSuccess, appInstallRequestDataFailure, appInstallLoading } from '@/actions/app-install'
import { appDetailRequestData } from '@/actions/app-detail'
import { selectAppDetailId } from '@/selector/app-detail'
import { selectLoggedUserEmail, selectClientId } from '@/selector/client'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator, SagaIteratorClone } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'
import { setAppDetailModalStateSuccess } from '../../actions/app-detail-modal'

jest.mock('@reapit/elements')

describe('app-install sagas', () => {
  describe('app-install post data', () => {
    const gen = cloneableGenerator(appInstallSaga)()
    expect(gen.next().value).toEqual(put(appInstallLoading()))
    expect(gen.next().value).toEqual(select(selectAppDetailId))
    expect(gen.next('1').value).toEqual(select(selectLoggedUserEmail))
    expect(gen.next('1').value).toEqual(select(selectClientId))

    test('clientId not exist', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appInstallRequestDataFailure()))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
    })

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next('1').value).toEqual(
        call(fetcher, {
          url: `${URLS.installations}`,
          api: REAPIT_API_BASE_URL,
          method: 'POST',
          headers: MARKETPLACE_HEADERS,
          body: { appId: '1', clientId: '1', approvedBy: '1' }
        })
      )
      expect(clone.next().value).toEqual(put(appInstallRequestSuccess()))
      expect(clone.next().value).toEqual(put(setAppDetailModalStateSuccess()))
      expect(clone.next().value).toEqual(
        put(
          appDetailRequestData({
            id: '1',
            clientId: '1'
          })
        )
      )
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appInstallRequestDataFailure()))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR
          })
        )
      )
      expect(clone.next().done).toBe(true)
    })
  })

  describe('app-install thunks', () => {
    describe('appInstallDataListen', () => {
      it('should trigger app install when called', () => {
        const gen = appInstallDataListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<String>>(ActionTypes.APP_INSTALL_REQUEST_DATA, appInstallSaga)
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('appDetailSagas', () => {
      it('should listen data request', () => {
        const gen = appInstallSagas()

        expect(gen.next().value).toEqual(all([fork(appInstallDataListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
