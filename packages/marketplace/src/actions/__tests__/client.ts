import { clientLoading, clientReceiveData, clientRequestData, clientClearData } from '../client'
import ActionTypes from '../../constants/action-types'
import { appsDataStub, featuredAppsDataStub } from '../../sagas/__stubs__/apps'

describe('client actions', () => {
  it('should create a clientLoading action', () => {
    expect(clientLoading.type).toEqual(ActionTypes.CLIENT_LOADING)
    expect(clientLoading(true).data).toEqual(true)
  })

  it('should create a clientReceiveData action', () => {
    expect(clientReceiveData.type).toEqual(ActionTypes.CLIENT_RECEIVE_DATA)
    expect(clientReceiveData({ featuredApps: featuredAppsDataStub.data.data, apps: appsDataStub.data }).data).toEqual({
      featuredApps: featuredAppsDataStub.data.data,
      apps: appsDataStub.data,
    })
  })

  it('should create a clientRequestData action', () => {
    expect(clientRequestData.type).toEqual(ActionTypes.CLIENT_REQUEST_DATA)
    expect(clientRequestData({ page: 1 }).data).toEqual({ page: 1 })
  })

  it('should create a clientClearData action', () => {
    expect(clientClearData.type).toEqual(ActionTypes.CLIENT_CLEAR_DATA)
    expect(clientClearData(null).data).toEqual(null)
  })
})
