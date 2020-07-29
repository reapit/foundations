import {
  myAppsLoading,
  myAppsReceiveData,
  myAppsRequestData,
  myAppsClearData,
  installedAppsLoading,
  installedAppsReceiveData,
  installedAppsRequestData,
  installedAppsClearData,
  clientFetchAppSummary,
  clientFetchAppSummarySuccess,
  clientFetchAppSummaryFailed,
  clientClearAppSummary,
  clientFetchWebComponentConfig,
  clientFetchWebComponentConfigSuccess,
  clientUpdateWebComponentConfig,
  clientFetchNegotiatorsSuccess,
} from '../apps'
import ActionTypes from '@/constants/action-types'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'

describe('apps', () => {
  describe('myAppsLoading', () => {
    it('should create a myAppsLoading action', () => {
      expect(myAppsLoading.type).toEqual(ActionTypes.MY_APPS_LOADING)
      expect(myAppsLoading(true).data).toEqual(true)
    })
  })
  describe('myAppsReceiveData', () => {
    it('should create a myAppsReceiveData action', () => {
      expect(myAppsReceiveData.type).toEqual(ActionTypes.MY_APPS_RECEIVE_DATA)
      expect(myAppsReceiveData(appsDataStub).data).toEqual(appsDataStub)
    })
  })

  describe('myAppsRequestData', () => {
    it('should create a myAppsRequestData action', () => {
      expect(myAppsRequestData.type).toEqual(ActionTypes.MY_APPS_REQUEST_DATA)
      expect(myAppsRequestData(1).data).toEqual(1)
    })
  })

  describe('myAppsClearData', () => {
    it('should create a myAppsClearData action', () => {
      expect(myAppsClearData.type).toEqual(ActionTypes.MY_APPS_CLEAR_DATA)
      expect(myAppsClearData(null).data).toEqual(null)
    })
  })

  describe('installedAppsLoading', () => {
    it('should create a installedAppsLoading action', () => {
      expect(installedAppsLoading.type).toEqual(ActionTypes.INSTALLED_APPS_LOADING)
      expect(installedAppsLoading(true).data).toEqual(true)
    })
  })

  describe('installedAppsReceiveData', () => {
    it('should create a installedAppsReceiveData action', () => {
      expect(installedAppsReceiveData.type).toEqual(ActionTypes.INSTALLED_APPS_RECEIVE_DATA)
      expect(installedAppsReceiveData(appsDataStub).data).toEqual(appsDataStub)
    })
  })

  describe('installedAppsRequestData', () => {
    it('should create a installedAppsRequestData action', () => {
      expect(installedAppsRequestData.type).toEqual(ActionTypes.INSTALLED_APPS_REQUEST_DATA)
      expect(installedAppsRequestData(1).data).toEqual(1)
    })
  })

  describe('installedAppsClearData', () => {
    it('should create a installedAppsClearData action', () => {
      expect(installedAppsClearData.type).toEqual(ActionTypes.INSTALLED_APPS_CLEAR_DATA)
      expect(installedAppsClearData(null).data).toEqual(null)
    })
  })

  describe('clientFetchAppSummary', () => {
    it('should create a clientFetchAppSummary action', () => {
      expect(clientFetchAppSummary.type).toEqual(ActionTypes.CLIENT_FETCH_APP_SUMMARY)
      expect(clientFetchAppSummary({ page: 1 }).data).toEqual({ page: 1 })
    })
  })

  describe('clientFetchAppSummarySuccess', () => {
    it('should create a clientFetchAppSummarySuccess action', () => {
      expect(clientFetchAppSummarySuccess.type).toEqual(ActionTypes.CLIENT_FETCH_APP_SUMMARY_SUCCESS)
      expect(
        clientFetchAppSummarySuccess({ featuredApps: [appDetailDataStub as AppDetailModel], apps: appsDataStub.data })
          .data,
      ).toEqual({
        featuredApps: [appDetailDataStub as AppDetailModel],
        apps: appsDataStub.data,
      })
    })
  })

  describe('clientFetchAppSummaryFailed', () => {
    it('should create a clientFetchAppSummaryFailed action', () => {
      expect(clientFetchAppSummaryFailed.type).toEqual(ActionTypes.CLIENT_FETCH_APP_SUMMARY_FAILED)
      expect(clientFetchAppSummaryFailed('error').data).toEqual('error')
    })
  })

  describe('clientFetchAppSummaryFailed', () => {
    it('should create a clientFetchAppSummaryFailed action', () => {
      expect(clientFetchAppSummaryFailed.type).toEqual(ActionTypes.CLIENT_FETCH_APP_SUMMARY_FAILED)
      expect(clientFetchAppSummaryFailed('error').data).toEqual('error')
    })
  })

  describe('clientClearData', () => {
    it('should create a clientClearData action', () => {
      expect(clientClearAppSummary.type).toEqual(ActionTypes.CLIENT_CLEAR_APP_SUMMARY)
      expect(clientClearAppSummary(null).data).toEqual(null)
    })
  })

  describe('clientFetchWebComponentConfig', () => {
    it('should create a clientFetchWebComponentConfig action', () => {
      expect(clientFetchWebComponentConfig.type).toEqual(ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG)
      expect(clientFetchWebComponentConfig({ customerId: 'DXX', applicationId: 'applicationId' }).data).toEqual({
        customerId: 'DXX',
        applicationId: 'applicationId',
      })
    })
  })

  describe('clientFetchWebComponentConfigSuccess', () => {
    it('should create a clientFetchWebComponentConfigSuccess action', () => {
      expect(clientFetchWebComponentConfigSuccess.type).toEqual(ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG_SUCCESS)
    })
  })

  describe('clientPutWebComponentConfig', () => {
    it('should create a clientPutWebComponentConfig action', () => {
      expect(clientUpdateWebComponentConfig.type).toEqual(ActionTypes.CLIENT_UPDATE_WEB_COMPONENT_CONFIG)
    })
  })

  describe('clientPutWebComponentConfig', () => {
    it('should create a clientPutWebComponentConfig action', () => {
      expect(clientFetchNegotiatorsSuccess.type).toEqual(ActionTypes.CLIENT_FETCH_NEGOTIATORS_SUCCESS)
    })
  })
})
