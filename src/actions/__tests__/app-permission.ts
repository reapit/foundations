import {
  appPermissionRequestDataFailure,
  appPermissionRequestData,
  appPermissionReceiveData,
  appPermissionLoading
} from '../app-permission'

import ActionTypes from '../../constants/action-types'

describe('app permission actions', () => {
  it('should create a appPermissionRequestDataFailure action', () => {
    expect(appPermissionRequestDataFailure.type).toEqual(ActionTypes.APP_PERMISION_REQUEST_DATA_FAILURE)
  })
  it('should create a appInstallRequestData action', () => {
    expect(appPermissionRequestData.type).toEqual(ActionTypes.APP_PERMISION_REQUEST_DATA)
    expect(appPermissionRequestData('abc').data).toEqual('abc')
  })

  it('should create a appPermissionLoading action', () => {
    expect(appPermissionLoading.type).toEqual(ActionTypes.APP_PERMISION_LOADING)
  })

  it('should create a appPermissionReceiveData action', () => {
    expect(appPermissionReceiveData.type).toEqual(ActionTypes.APP_PERMISION_RECEIVE_DATA)
  })
})
