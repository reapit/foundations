import { cloneableGenerator } from '@redux-saga/testing-utils'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import {
  createInstallation,
  CreateInstallationParams,
  fetchInstallationsList,
  removeAccessToAppById,
  RemoveAccessToAppByIdParams,
} from '@/services/installations'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectClientId, selectDeveloperId, selectLoggedUserEmail } from '@/selector/auth'
import {
  fetchInstallationsListSuccess,
  installAppFailed,
  installAppSuccess,
  uninstallAppFailed,
  uninstallAppSuccess,
} from '@/actions/installations'
import installationsSagas, { appInstallationsListen, installSagas, uninstallSagas } from '../installations'
import { auth } from '@/selector/__mocks__/auth'
import { GET_ALL_PAGE_SIZE } from '../../../constants/paginator'
import { installationsStub } from '../../__stubs__/installations'

describe('installations', () => {
  const params = {
    data: {
      callback: jest.fn(),
    },
    type: ActionTypes.INSTALL_APP as string,
  } as Action<CreateInstallationParams>

  describe('installSagas', () => {
    const gen = cloneableGenerator(installSagas)(params)
    expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(gen.next(auth).value).toEqual(call(selectLoggedUserEmail, auth))
    expect(gen.next(auth.loginIdentity.email).value).toEqual(call(selectClientId, auth))
    expect(gen.next(auth.loginIdentity.clientId).value).toEqual(call(selectDeveloperId, auth))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(auth.loginIdentity.developerId).value).toEqual(
        call(createInstallation, {
          appId: undefined,
          clientId: auth.loginIdentity.clientId,
          approvedBy: auth.loginIdentity.email,
        } as CreateInstallationParams),
      )
      expect(clone.next().value).toEqual(put(installAppSuccess()))
      expect(clone.next().value).toEqual(
        call(fetchInstallationsList, {
          pageNumber: 1,
          pageSize: GET_ALL_PAGE_SIZE,
          isInstalled: true,
          developerId: auth.loginIdentity.developerId,
          appId: undefined,
        } as any),
      )
      expect(clone.next(installationsStub).value).toEqual(put(fetchInstallationsListSuccess(installationsStub)))
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
    expect(gen.next(auth.loginIdentity.email).value).toEqual(call(selectDeveloperId, auth))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(auth.loginIdentity.email).value).toEqual(
        call(removeAccessToAppById, { ...params.data, terminatedBy: auth.loginIdentity.email }),
      )
      expect(clone.next().value).toEqual(put(uninstallAppSuccess()))
      expect(clone.next().value).toEqual(
        call(fetchInstallationsList, {
          pageNumber: 1,
          pageSize: GET_ALL_PAGE_SIZE,
          isInstalled: true,
          developerId: '123',
          appId: undefined,
        } as any),
      )
      expect(clone.next(installationsStub).value).toEqual(put(fetchInstallationsListSuccess(installationsStub)))
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
