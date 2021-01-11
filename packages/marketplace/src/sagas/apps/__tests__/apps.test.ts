import { cloneableGenerator } from '@redux-saga/testing-utils'
import { put, takeLatest, all, fork, call } from '@redux-saga/core/effects'
import { Action } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import {
  appSagasListen,
  appsSagas,
  fetchAppDetailSagas,
  fetchApps,
  fetchFeatureApps,
  fetchDeveloperApps,
} from '../apps'
import { fetchAppByIdApi, FetchAppByIdParams, fetchAppsApi, FetchAppsParams } from '@/services/apps'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { auth } from '@/selector/auth/__mocks__/auth'
import { selectClientId } from '@/selector/auth'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import {
  fetchAppDetailFailed,
  fetchAppDetailSuccess,
  fetchAppsFailed,
  fetchAppsSuccess,
  fetchFeatureAppsFailed,
  fetchFeatureAppsSuccess,
} from '@/actions/apps'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { fetchApiKeyInstallationById } from '@/services/installations'

describe('apps', () => {
  describe('fetchApps', () => {
    const params = {
      data: {
        pageNumber: 1,
        pageSize: 10,
      },
      type: ActionTypes.FETCH_APPS as string,
    } as Action<FetchAppsParams>
    const gen = cloneableGenerator(fetchApps)(params)
    expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(gen.next(auth).value).toEqual(call(selectClientId, auth))

    it('api call success', () => {
      window.reapit.config.orgAdminRestrictedAppIds = []
      const clone = gen.clone()
      expect(clone.next(auth.loginIdentity.clientId).value).toEqual(
        call(fetchAppsApi, {
          clientId: auth.loginIdentity.clientId,
          developerId: undefined,
          pageNumber: 1,
          pageSize: 10,
        } as FetchAppsParams),
      )
      expect(clone.next(appsDataStub).value).toEqual(put(fetchAppsSuccess(appsDataStub)))
      expect(clone.next().done).toBe(true)
    })

    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchAppsFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchFeatureApps', () => {
    const params = {
      data: {
        pageNumber: 1,
        pageSize: 10,
      },
      type: ActionTypes.FETCH_FEATURE_APPS as string,
    } as Action<FetchAppsParams>
    const gen = cloneableGenerator(fetchFeatureApps)(params)
    expect(gen.next().value).toEqual(call(reapitConnectBrowserSession.connectSession))
    expect(gen.next(auth).value).toEqual(call(selectClientId, auth))

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next(auth.loginIdentity.clientId).value).toEqual(
        call(fetchAppsApi, {
          clientId: auth.loginIdentity.clientId,
          developerId: undefined,
          isFeatured: true,
          pageNumber: 1,
          pageSize: 10,
        } as FetchAppsParams),
      )
      expect(clone.next(appsDataStub).value).toEqual(put(fetchFeatureAppsSuccess(appsDataStub)))
      expect(clone.next().done).toBe(true)
    })

    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchFeatureAppsFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('fetchAppDetailSagas', () => {
    const params = {
      data: {
        id: '123',
        clientId: '123',
      },
      type: ActionTypes.FETCH_APP_DETAIL as string,
    } as Action<FetchAppByIdParams>
    const gen = cloneableGenerator(fetchAppDetailSagas)(params)
    expect(gen.next().value).toEqual(call(fetchAppByIdApi, { ...params.data }))

    it('should fetchApiKeyInstallationById', () => {
      const clone = gen.clone()
      expect(clone.next(appDetailDataStub.data).value).toEqual(
        call(fetchApiKeyInstallationById, {
          installationId: appDetailDataStub.data.installationId,
        }),
      )
      expect(clone.next().value).toEqual(put(fetchAppDetailSuccess(appDetailDataStub.data)))
      expect(clone.next().done).toEqual(true)
    })

    it('api call success', () => {
      const clone = gen.clone()
      expect(clone.next({ ...appDetailDataStub.data, isWebComponent: false, installationId: undefined }).value).toEqual(
        put(fetchAppDetailSuccess({ ...appDetailDataStub.data, isWebComponent: false, installationId: undefined })),
      )
      expect(clone.next().done).toEqual(true)
    })

    it('api call fail', () => {
      const clone = gen.clone()
      const err = {
        description: 'mockError',
      }
      expect(clone.throw && clone.throw(err).value).toEqual(put(fetchAppDetailFailed(err.description)))
      expect(clone.next().done).toBe(true)
    })
  })

  describe('appSagasListen', () => {
    it('should trigger request data when called', () => {
      const gen = appSagasListen()
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchAppByIdParams>>(ActionTypes.FETCH_APP_DETAIL, fetchAppDetailSagas),
      )
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_FEATURE_APPS, fetchFeatureApps),
      )
      expect(gen.next().value).toEqual(takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_APPS, fetchApps))
      expect(gen.next().value).toEqual(
        takeLatest<Action<FetchAppsParams>>(ActionTypes.FETCH_DEVELOPER_APPS, fetchDeveloperApps),
      )
      expect(gen.next().done).toBe(true)
    })
  })

  describe('appsSagas', () => {
    it('should listen data request', () => {
      const gen = appsSagas()
      expect(gen.next().value).toEqual(all([fork(appSagasListen)]))
      expect(gen.next().done).toBe(true)
    })
  })
})
