import appInstallationsSagas, {
  appInstallationsListen,
  appInstallSaga,
  appUninstallSaga,
  installationsSaga,
  fetchInstallations,
  fetchInstallApp,
  fetchUninstallApp
} from '../app-installations'
import { errorThrownServer } from '@/actions/error'
import errorMessages from '@/constants/error-messages'
import ActionTypes from '@/constants/action-types'
import { put, takeLatest, all, fork, call, select } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import { cloneableGenerator } from '@redux-saga/testing-utils'
import {
  InstallationParams,
  UninstallParams,
  InstallParams,
  appInstallationsReceiveData,
  appInstallationsRequestDataFailure,
  appInstallationsSetFormState
} from '@/actions/app-installations'
import { installationsStub } from '../__stubs__/installations'
import { selectClientId, selectLoggedUserEmail } from '@/selector/client'

jest.mock('@reapit/elements')

const installationsParams = {
  data: {
    appId: ['1']
  }
}

const installParams = {
  data: {
    appId: '1'
  }
}

const uninstallParams = {
  data: {
    appId: '1',
    installationId: '1'
  }
}

describe('app-installations sagas', () => {
  describe('installationsFetchData', () => {
    const gen = cloneableGenerator(installationsSaga)(installationsParams)
    expect(gen.next().value).toEqual(call(fetchInstallations, installationsParams.data))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(installationsStub).value).toEqual(put(appInstallationsReceiveData(installationsStub)))
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(new Error('')).value).toEqual(put(appInstallationsRequestDataFailure()))
        expect(clone.next().value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
        )
      }
      expect(clone.next().done).toBe(true)
    })
  })

  describe('appInstallSaga', () => {
    const gen = cloneableGenerator(appInstallSaga)(installParams)
    expect(gen.next().value).toEqual(put(appInstallationsSetFormState('SUBMITTING')))
    expect(gen.next().value).toEqual(select(selectLoggedUserEmail))
    expect(gen.next('1').value).toEqual(select(selectClientId))

    test('clientId not exist', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appInstallationsSetFormState('ERROR')))
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
        call(fetchInstallApp, { data: installParams.data, clientId: '1', email: '1' })
      )
      expect(clone.next().value).toEqual(put(appInstallationsSetFormState('SUCCESS')))
    })
  })

  describe('appUninstallSaga', () => {
    const { installationId, ...body } = uninstallParams.data
    const gen = cloneableGenerator(appUninstallSaga)(uninstallParams)
    expect(gen.next().value).toEqual(put(appInstallationsSetFormState('SUBMITTING')))
    expect(gen.next().value).toEqual(select(selectLoggedUserEmail))

    expect(gen.next('1').value).toEqual(call(fetchUninstallApp, { data: uninstallParams.data, email: '1' }))

    test('api call success', () => {
      const clone = gen.clone()
      expect(clone.next().value).toEqual(put(appInstallationsSetFormState('SUCCESS')))
      expect(clone.next().done).toBe(true)
    })

    test('api fail sagas', () => {
      const clone = gen.clone()
      if (clone.throw) {
        expect(clone.throw(new Error('')).value).toEqual(put(appInstallationsSetFormState('ERROR')))
        expect(clone.next().value).toEqual(
          put(
            errorThrownServer({
              type: 'SERVER',
              message: errorMessages.DEFAULT_SERVER_ERROR
            })
          )
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
          takeLatest<Action<InstallationParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_DATA, installationsSaga)
        )
        expect(gen.next().value).toEqual(
          takeLatest<Action<UninstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL, appUninstallSaga)
        )
        expect(gen.next().value).toEqual(
          takeLatest<Action<InstallParams>>(ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL, appInstallSaga)
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
