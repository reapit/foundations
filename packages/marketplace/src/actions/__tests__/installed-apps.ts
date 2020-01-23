import {
  installedAppsLoading,
  installedAppsReceiveData,
  installedAppsRequestData,
  installedAppsClearData
} from '../installed-apps'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('installedApps actions', () => {
  it('should create a installedAppsLoading action', () => {
    expect(installedAppsLoading.type).toEqual(ActionTypes.INSTALLED_APPS_LOADING)
    expect(installedAppsLoading(true).data).toEqual(true)
  })

  it('should create a installedAppsReceiveData action', () => {
    expect(installedAppsReceiveData.type).toEqual(ActionTypes.INSTALLED_APPS_RECEIVE_DATA)
    expect(installedAppsReceiveData(appsDataStub).data).toEqual(appsDataStub)
  })

  it('should create a installedAppsRequestData action', () => {
    expect(installedAppsRequestData.type).toEqual(ActionTypes.INSTALLED_APPS_REQUEST_DATA)
    expect(installedAppsRequestData(1).data).toEqual(1)
  })

  it('should create a installedAppsClearData action', () => {
    expect(installedAppsClearData.type).toEqual(ActionTypes.INSTALLED_APPS_CLEAR_DATA)
    expect(installedAppsClearData(null).data).toEqual(null)
  })
})
