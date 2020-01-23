import {
  appDetailLoading,
  appDetailReceiveData,
  appDetailRequestData,
  appDetailClearData,
  appDetailFailure,
  requestAuthenticationCode,
  requestAuthenticationSuccess,
  requestAuthenticationFailure,
  removeAuthenticationCode
} from '../app-detail'
import ActionTypes from '../../constants/action-types'
import { appDetailDataStub } from '../../sagas/__stubs__/app-detail'

describe('appDetail actions', () => {
  it('should create a appDetailLoading action', () => {
    expect(appDetailLoading.type).toEqual(ActionTypes.APP_DETAIL_LOADING)
    expect(appDetailLoading(true).data).toEqual(true)
  })

  it('should create a appDetailReceiveData action', () => {
    expect(appDetailReceiveData.type).toEqual(ActionTypes.APP_DETAIL_RECEIVE_DATA)
    expect(appDetailReceiveData(appDetailDataStub).data).toEqual(appDetailDataStub)
  })

  it('should create a appDetailRequestData action', () => {
    expect(appDetailRequestData.type).toEqual(ActionTypes.APP_DETAIL_REQUEST_DATA)
    expect(appDetailRequestData({ id: '1', clientId: '1' }).data).toEqual({ id: '1', clientId: '1' })
  })

  it('should create a appDetailClearData action', () => {
    expect(appDetailClearData.type).toEqual(ActionTypes.APP_DETAIL_CLEAR_DATA)
    expect(appDetailClearData(null).data).toEqual(null)
  })

  it('should create a appDetailFailure action', () => {
    expect(appDetailFailure.type).toEqual(ActionTypes.APP_DETAIL_REQUEST_DATA_FAILURE)
  })

  it('should create a requestAuthenticationCode action', () => {
    expect(requestAuthenticationCode.type).toEqual(ActionTypes.REQUEST_AUTHENTICATION_CODE)
  })

  it('should create a requestAuthenticationSuccess action', () => {
    expect(requestAuthenticationSuccess.type).toEqual(ActionTypes.REQUEST_AUTHENTICATION_CODE_SUCCESS)
  })

  it('should create a requestAuthenticationFailure action', () => {
    expect(requestAuthenticationFailure.type).toEqual(ActionTypes.REQUEST_AUTHENTICATION_CODE_FAILURE)
  })
  it('should create a removeAuthenticationCode action', () => {
    expect(removeAuthenticationCode.type).toEqual(ActionTypes.REMOVE_AUTHENTICATION_CODE)
  })
})
