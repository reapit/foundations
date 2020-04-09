import {
  appInstallationsReceiveData,
  appInstallationsRequestData,
  appInstallationsRequestDataFailure,
  appInstallationsFilterReceiveData,
  appInstallationsFilterRequestData,
  appInstallationsFilterRequestDataFailure,
  appInstallationsRequestInstall,
  appInstallationsRequestUninstall,
  appInstallationsSetFormState,
} from '../app-installations'
import ActionTypes from '@/constants/action-types'
import { installationsStub } from '@/sagas/__stubs__/installations'

describe('app install actions', () => {
  it('should create a appInstallationsReceiveData action', () => {
    expect(appInstallationsReceiveData.type).toEqual(ActionTypes.APP_INSTALLATIONS_RECEIVE_DATA)
    expect(appInstallationsReceiveData(installationsStub).data).toEqual(installationsStub)
  })
  it('should create a appInstallationsRequestData action', () => {
    expect(appInstallationsRequestData.type).toEqual(ActionTypes.APP_INSTALLATIONS_REQUEST_DATA)
    expect(appInstallationsRequestData({ appId: ['1'] }).data).toEqual({ appId: ['1'] })
  })
  it('should create a appInstallationsRequestDataFailure action', () => {
    expect(appInstallationsRequestDataFailure.type).toEqual(ActionTypes.APP_INSTALLATIONS_REQUEST_DATA_FAILURE)
  })

  it('should create a appInstallationsFilterReceiveData action', () => {
    expect(appInstallationsFilterReceiveData.type).toEqual(ActionTypes.APP_INSTALLATIONS_FILTER_RECEIVE_DATA)
    expect(appInstallationsFilterReceiveData(installationsStub).data).toEqual(installationsStub)
  })
  it('should create a appInstallationsFilterRequestData action', () => {
    expect(appInstallationsFilterRequestData.type).toEqual(ActionTypes.APP_INSTALLATIONS_FILTER_REQUEST_DATA)
    expect(appInstallationsFilterRequestData({ appId: ['1'] }).data).toEqual({ appId: ['1'] })
  })
  it('should create a appInstallationsFilterRequestDataFailure action', () => {
    expect(appInstallationsFilterRequestDataFailure.type).toEqual(
      ActionTypes.APP_INSTALLATIONS_FILTER_REQUEST_DATA_FAILURE,
    )
  })

  it('should create a appInstallationsRequestInstall action', () => {
    expect(appInstallationsRequestInstall.type).toEqual(ActionTypes.APP_INSTALLATIONS_REQUEST_INSTALL)
    expect(appInstallationsRequestInstall({ appId: '1' }).data).toEqual({ appId: '1' })
  })
  it('should create a appInstallationsRequestUninstall action', () => {
    expect(appInstallationsRequestUninstall.type).toEqual(ActionTypes.APP_INSTALLATIONS_REQUEST_UNINSTALL)
    expect(appInstallationsRequestUninstall({ appId: '1', installationId: '1' }).data).toEqual({
      appId: '1',
      installationId: '1',
    })
  })
  it('should create a appInstallationsSetFormState action', () => {
    expect(appInstallationsSetFormState.type).toEqual(ActionTypes.APP_INSTALLATIONS_SET_FORM_STATE)
    expect(appInstallationsSetFormState('PENDING').data).toEqual('PENDING')
  })
})
