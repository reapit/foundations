import { cloneableGenerator } from '@redux-saga/testing-utils'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { appInstallationsListen, installationsSagas, installSagas, uninstallSagas } from '@/sagas/installations'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import {
  createInstallation,
  CreateInstallationParams,
  removeAccessToAppById,
  RemoveAccessToAppByIdParams,
} from '@/services/installations'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { auth } from '@/selector/auth/__mocks__/auth'
import { selectLoggedUserEmail } from '@/selector/auth'
import { installAppFailed, installAppSuccess, uninstallAppFailed, uninstallAppSuccess } from '@/actions/installations'

describe('installations', () => {
  const params = {
    data: {
      callback: jest.fn(),
      clientId: 'SOME_ID',
    },
    type: ActionTypes.INSTALL_APP as string,
  } as Action<CreateInstallationParams>

  describe('installSagas', () => {
    const gen = cloneableGenerator(installSagas)(params)
    expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(gen.next(auth).value).toEqual(call(selectLoggedUserEmail, auth))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(auth.loginIdentity.email).value).toEqual(
        call(createInstallation, {
          clientId: params.data.clientId,
          approvedBy: auth.loginIdentity.email,
        } as CreateInstallationParams),
      )
      expect(clone.next().value).toEqual(put(installAppSuccess()))
      expect(clone.next().done).toBe(true)
    })

    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(installAppFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('uninstallSagas', () => {
    const params = {
      data: {
        installationId: '123',
      },
      type: ActionTypes.UNINSTALL_APP_FAILED as string,
    } as Action<RemoveAccessToAppByIdParams>
    const gen = cloneableGenerator(uninstallSagas)(params)
    expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(gen.next(auth).value).toEqual(call(selectLoggedUserEmail, auth))
    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(auth.loginIdentity.email).value).toEqual(
        call(removeAccessToAppById, { ...params.data, terminatedBy: auth.loginIdentity.email }),
      )
      expect(clone.next().value).toEqual(put(uninstallAppSuccess()))
      expect(clone.next().done).toBe(true)
    })

    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(uninstallAppFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })
  describe('appInstallationsListen', () => {
    it('should trigger request data when called', () => {
      const gen = appInstallationsListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<RemoveAccessToAppByIdParams>>(ActionTypes.UNINSTALL_APP, uninstallSagas),
      )
      expect(gen.next().value).toEqual(
        takeLatest<Action<CreateInstallationParams>>(ActionTypes.INSTALL_APP, installSagas),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('installationsSagas', () => {
    it('should listen data request', () => {
      const gen = installationsSagas()
      expect(gen.next().value).toEqual(all([fork(appInstallationsListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
