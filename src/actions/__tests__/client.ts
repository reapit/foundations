import {
  clientLoading,
  clientReceiveData,
  clientRequestData,
  clientClearData,
  clientSearchApps,
  clientReceiveSearchApps
} from '../client'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('client actions', () => {
  it('should create a clientLoading action', () => {
    expect(clientLoading.type).toEqual(ActionTypes.CLIENT_LOADING)
    expect(clientLoading(true).data).toEqual(true)
  })

  it('should create a clientReceiveData action', () => {
    expect(clientReceiveData.type).toEqual(ActionTypes.CLIENT_RECEIVE_DATA)
    expect(clientReceiveData(appsDataStub).data).toEqual(appsDataStub)
  })

  it('should create a clientRequestData action', () => {
    expect(clientRequestData.type).toEqual(ActionTypes.CLIENT_REQUEST_DATA)
    expect(clientRequestData(1).data).toEqual(1)
  })

  it('should create a clientClearData action', () => {
    expect(clientClearData.type).toEqual(ActionTypes.CLIENT_CLEAR_DATA)
    expect(clientClearData(null).data).toEqual(null)
  })

  it('should create a clientSearchApps action', () => {
    expect(clientSearchApps.type).toEqual(ActionTypes.CLIENT_SEARCH_APPS)
    expect(clientSearchApps('DATA').data).toEqual('DATA')
  })
  it('should create a clientReceiveSearchApps action', () => {
    expect(clientReceiveSearchApps.type).toEqual(ActionTypes.CLIENT_RECEIVE_SEARCH_APPS)
    expect(clientReceiveSearchApps({}).data).toEqual({})
  })
})
