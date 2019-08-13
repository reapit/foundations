import {
  appUninstallRequestSuccess,
  appUninstallRequestDataFailure,
  appUninstallRequestData,
  appUninstallLoading,
  appUninstallDone
} from '../app-uninstall'
import ActionTypes from '@/constants/action-types'

describe('app install actions', () => {
  it('should create a appUninstallRequestData action', () => {
    expect(appUninstallDone.type).toEqual(ActionTypes.APP_UNINSTALL_DONE)
  })
  it('should create a appUninstallRequestData action', () => {
    expect(appUninstallRequestData.type).toEqual(ActionTypes.APP_UNINSTALL_REQUEST_DATA)
  })

  it('should create a appUninstallRequestData action', () => {
    expect(appUninstallRequestSuccess.type).toEqual(ActionTypes.APP_UNINSTALL_REQUEST_DATA_SUCCESS)
  })
  it('should create a appUninstallRequestDataFailure action', () => {
    expect(appUninstallRequestDataFailure.type).toEqual(ActionTypes.APP_UNINSTALL_REQUEST_DATA_FAILURE)
  })

  it('should create a appUninstallLoading action', () => {
    expect(appUninstallLoading.type).toEqual(ActionTypes.APP_UNINSTALL_LOADING)
  })
})
