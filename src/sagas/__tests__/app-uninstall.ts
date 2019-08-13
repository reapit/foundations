import appUninstallSagas, { appUninstallDataListen, appUninstallSaga } from '../app-uninstall'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import {
  appUninstallRequestSuccess,
  appUninstallRequestDataFailure,
  appUninstallLoading
} from '@/actions/app-uninstall'
import { selectAppDetailId, selectAppDetailInstallationId } from '@/selector/app-detail'
import { selectLoggedUserEmail } from '@/selector/client'
import { Action } from '@/types/core'
import fetcher from '@/utils/fetcher'
import { URLS, MARKETPLACE_HEADERS } from '@/constants/api'
import { cloneableGenerator, SagaIteratorClone } from '@redux-saga/testing-utils'
import { REAPIT_API_BASE_URL } from '../../constants/api'

jest.mock('../../utils/fetcher')

describe('app-uninstall sagas', () => {
  describe('app-uninstall post data', () => {
    const gen = cloneableGenerator(appUninstallSaga)()
    expect(gen.next().value).toEqual(put(appUninstallLoading()))
    expect(gen.next().value).toEqual(select(selectAppDetailId))
    expect(gen.next(1).value).toEqual(select(selectLoggedUserEmail))
    expect(gen.next('1').value).toEqual(select(selectAppDetailInstallationId))

    test('clientId not exist', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appUninstallRequestDataFailure()))
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
      expect(clone.next(1).value).toEqual(
        call(fetcher, {
          url: `${URLS.installations}/1/terminate`,
          api: REAPIT_API_BASE_URL,
          method: 'POST',
          headers: MARKETPLACE_HEADERS,
          body: { appId: 1, terminatedBy: '1', terminatedReason: 'User uninstall' }
        })
      )
      expect(clone.next().value).toEqual(put(appUninstallRequestSuccess()))
    })

    test('abc', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appUninstallRequestDataFailure()))
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

  describe('app-uninstall thunks', () => {
    describe('appUninstallDataListen', () => {
      it('should trigger app install when called', () => {
        const gen = appUninstallDataListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<String>>(ActionTypes.APP_UNINSTALL_REQUEST_DATA, appUninstallSaga)
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('appDetailSagas', () => {
      it('should listen data request', () => {
        const gen = appUninstallSagas()

        expect(gen.next().value).toEqual(all([fork(appUninstallDataListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
