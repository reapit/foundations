import {
  clientFetchAppSummary,
  clientFetchAppSummarySuccess,
  clientFetchAppSummaryFailed,
  clientClearAppSummary,
  clientFetchWebComponentConfig,
  clientFetchWebComponentConfigSuccess,
  clientUpdateWebComponentConfig,
  clientFetchNegotiatorsSuccess,
} from '../client'
import ActionTypes from '../../constants/action-types'
import { appsDataStub, featuredAppsDataStub } from '../../sagas/__stubs__/apps'

describe('client actions', () => {
  it('should create a clientFetchAppSummary action', () => {
    expect(clientFetchAppSummary.type).toEqual(ActionTypes.CLIENT_FETCH_APP_SUMMARY)
    expect(clientFetchAppSummary({ page: 1 }).data).toEqual({ page: 1 })
  })
  it('should create a clientFetchAppSummarySuccess action', () => {
    expect(clientFetchAppSummarySuccess.type).toEqual(ActionTypes.CLIENT_FETCH_APP_SUMMARY_SUCCESS)
    expect(
      clientFetchAppSummarySuccess({ featuredApps: featuredAppsDataStub.data.data, apps: appsDataStub.data }).data,
    ).toEqual({
      featuredApps: featuredAppsDataStub.data.data,
      apps: appsDataStub.data,
    })
  })
  it('should create a clientFetchAppSummaryFailed action', () => {
    expect(clientFetchAppSummaryFailed.type).toEqual(ActionTypes.CLIENT_FETCH_APP_SUMMARY_FAILED)
    expect(clientFetchAppSummaryFailed('error').data).toEqual('error')
  })
  it('should create a clientClearData action', () => {
    expect(clientClearAppSummary.type).toEqual(ActionTypes.CLIENT_CLEAR_APP_SUMMARY)
    expect(clientClearAppSummary(null).data).toEqual(null)
  })
  it('should create a clientFetchWebComponentConfig action', () => {
    expect(clientFetchWebComponentConfig.type).toEqual(ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG)
    expect(clientFetchWebComponentConfig({ customerId: 'DXX', applicationId: 'applicationId' }).data).toEqual({
      customerId: 'DXX',
      applicationId: 'applicationId',
    })
  })
  it('should create a clientFetchWebComponentConfigSuccess action', () => {
    expect(clientFetchWebComponentConfigSuccess.type).toEqual(ActionTypes.CLIENT_FETCH_WEB_COMPONENT_CONFIG_SUCCESS)
  })
  it('should create a clientPutWebComponentConfig action', () => {
    expect(clientUpdateWebComponentConfig.type).toEqual(ActionTypes.CLIENT_UPDATE_WEB_COMPONENT_CONFIG)
  })
  it('should create a clientPutWebComponentConfig action', () => {
    expect(clientFetchNegotiatorsSuccess.type).toEqual(ActionTypes.CLIENT_FETCH_NEGOTIATORS_SUCCESS)
  })
})
