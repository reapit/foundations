import {
  appInstallRequestSuccess,
  appInstallRequestDataFailure,
  appInstallRequestData,
  appInstallLoading,
  appInstallDone
} from '../app-install'
import ActionTypes from '@/constants/action-types'

describe('app install actions', () => {
  it('should create a appInstallRequestData action', () => {
    expect(appInstallDone.type).toEqual(ActionTypes.APP_INSTALL_DONE)
  })
  it('should create a appInstallRequestData action', () => {
    expect(appInstallRequestData.type).toEqual(ActionTypes.APP_INSTALL_REQUEST_DATA)
  })

  it('should create a appInstallRequestData action', () => {
    expect(appInstallRequestSuccess.type).toEqual(ActionTypes.APP_INSTALL_REQUEST_DATA_SUCCESS)
  })
  it('should create a appInstallRequestDataFailure action', () => {
    expect(appInstallRequestDataFailure.type).toEqual(ActionTypes.APP_INSTALL_REQUEST_DATA_FAILURE)
  })

  it('should create a appInstallLoading action', () => {
    expect(appInstallLoading.type).toEqual(ActionTypes.APP_INSTALL_LOADING)
  })
})
