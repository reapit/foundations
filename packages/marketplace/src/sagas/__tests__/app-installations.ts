import appInstallationsSagas, { appInstallationsListen, appInstallSaga, appUninstallSaga } from '../app-installations'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import { UninstallParams, InstallParams, appInstallationsSetFormState } from '@/actions/installations'
import { selectLoggedUserEmail } from '@/selector/client'
import { createInstallation, removeAccessToAppById } from '@/services/installations'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession } from '@reapit/connect-session'
import { selectClientId } from '@/selector/auth'

jest.mock('@/services/installations')
jest.mock('@reapit/elements')

const installParams = {
  data: {
    appId: '1',
  },
}

const uninstallParams = {
  data: {
    appId: '1',
    installationId: '1',
  },
}

const connectSession = 'connectSession'

describe('app-installations sagas', () => {
  describe('appInstallSaga', () => {
    const gen = cloneableGenerator(appInstallSaga)(installParams)
    expect(gen.next().value).toEqual(put(appInstallationsSetFormState('SUBMITTING')))

    expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(gen.next(connectSession).value).toEqual(
      call(selectLoggedUserEmail, (connectSession as unknown) as ReapitConnectSession),
    )
    expect(gen.next('1').value).toEqual(call(selectClientId, (connectSession as unknown) as ReapitConnectSession))

    test('clientId not exist', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appInstallationsSetFormState('ERROR')))
      expect(clone.next().value).toEqual(
        put(
          errorThrownServer({
            type: 'SERVER',
            message: errorMessages.DEFAULT_SERVER_ERROR,
          }),
        ),
      )
    })

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next('1').value).toEqual(
        call(createInstallation, { ...installParams.data, clientId: '1', approvedBy: '1' }),
      )
      expect(clone.next().value).toEqual(put(appInstallationsSetFormState('SUCCESS')))
    })
  })

  describe('appUninstallSaga', () => {
    const gen = cloneableGenerator(appUninstallSaga)(uninstallParams)
    expect(gen.next().value).toEqual(put(appInstallationsSetFormState('SUBMITTING')))

    expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(gen.next(connectSession).value).toEqual(
      call(selectLoggedUserEmail, (connectSession as unknown) as ReapitConnectSession),
    )

    expect(gen.next('1').value).toEqual(call(removeAccessToAppById, { ...uninstallParams.data, terminatedBy: '1' }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appInstallationsSetFormState('SUCCESS')))
      expect(clone.next().done).toBe(true)
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(errorMessages.DEFAULT_SERVER_ERROR).value).toEqual(
          put(appInstallationsSetFormState('ERROR')),
        )
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

  describe('app-install thunks', () => {
    describe('appInstallDataListen', () => {
      it('should trigger app install when called', () => {
        const gen = appInstallationsListen()
        expect(gen.next().value).toEqual(
          takeLatest<Action<UninstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL, appUninstallSaga),
        )
        expect(gen.next().value).toEqual(
          takeLatest<Action<InstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL, appInstallSaga),
        )
        expect(gen.next().done).toBe(true)
      })
    })

    describe('appDetailSagas', () => {
      it('should listen data request', () => {
        const gen = appInstallationsSagas()

        expect(gen.next().value).toEqual(all([fork(appInstallationsListen)]))
        expect(gen.next().done).toBe(true)
      })
    })
  })
})
