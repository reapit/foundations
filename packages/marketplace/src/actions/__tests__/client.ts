import {
  clientAppSummaryRequestData,
  clientAppSummaryReceiveData,
  clientAppSummaryRequestDataFailure,
  clientAppSummaryClearData,
} from '../client'
import ActionTypes from '../../constants/action-types'
import { appsDataStub, featuredAppsDataStub } from '../../sagas/__stubs__/apps'

describe('client actions', () => {
  it('should create a clientAppSummaryRequestData action', () => {
    expect(clientAppSummaryRequestData.type).toEqual(ActionTypes.CLIENT_APP_SUMMARY_REQUEST_DATA)
    expect(clientAppSummaryRequestData({ page: 1 }).data).toEqual({ page: 1 })
  })
  it('should create a clientAppSummaryReceiveData action', () => {
    expect(clientAppSummaryReceiveData.type).toEqual(ActionTypes.CLIENT_APP_SUMMARY_RECEIVE_DATA)
    expect(
      clientAppSummaryReceiveData({ featuredApps: featuredAppsDataStub.data.data, apps: appsDataStub.data }).data,
    ).toEqual({
      featuredApps: featuredAppsDataStub.data.data,
      apps: appsDataStub.data,
    })
  })
  it('should create a clientAppSummaryRequestDataFailure action', () => {
    expect(clientAppSummaryRequestDataFailure.type).toEqual(ActionTypes.CLIENT_APP_SUMMARY_REQUEST_FAILURE)
    expect(clientAppSummaryRequestDataFailure('error').data).toEqual('error')
  })
  it('should create a clientClearData action', () => {
    expect(clientAppSummaryClearData.type).toEqual(ActionTypes.CLIENT_APP_SUMMARY_CLEAR_DATA)
    expect(clientAppSummaryClearData(null).data).toEqual(null)
  })
})
