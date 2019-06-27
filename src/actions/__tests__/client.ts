import { clientLoading, clientReceiveData, clientRequestData, clientClearData } from '../client'
import ActionTypes from '../../constants/action-types'
import { clientDataStub } from '../../sagas/__stubs__/client'

describe('client actions', () => {
  it('should create a clientLoading action', () => {
    expect(clientLoading.type).toEqual(ActionTypes.CLIENT_LOADING)
    expect(clientLoading(true).data).toEqual(true)
  })

  it('should create a clientReceiveData action', () => {
    expect(clientReceiveData.type).toEqual(ActionTypes.CLIENT_RECEIVE_DATA)
    expect(clientReceiveData(clientDataStub).data).toEqual(clientDataStub)
  })

  it('should create a clientRequestData action', () => {
    expect(clientRequestData.type).toEqual(ActionTypes.CLIENT_REQUEST_DATA)
    expect(clientRequestData().data).toEqual(undefined)
  })

  it('should create a clientClearData action', () => {
    expect(clientClearData.type).toEqual(ActionTypes.CLIENT_CLEAR_DATA)
    expect(clientClearData(null).data).toEqual(null)
  })
})
