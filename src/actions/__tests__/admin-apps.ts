import { adminAppsReceiveData, adminAppsRequestData, adminAppsRequestFailure } from '../admin-apps'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('adminApps actions', () => {
  it('should create a adminAppsReceiveData action', () => {
    expect(adminAppsReceiveData.type).toEqual(ActionTypes.ADMIN_APPS_RECEIVE_DATA)
    expect(adminAppsReceiveData(appsDataStub.data).data).toEqual(appsDataStub.data)
  })

  it('should create a adminAppsRequestData action', () => {
    expect(adminAppsRequestData.type).toEqual(ActionTypes.ADMIN_APPS_REQUEST_DATA)
    expect(adminAppsRequestData().data).toEqual(undefined)
  })

  it('should create a adminAppsRequestFailure action', () => {
    expect(adminAppsRequestFailure.type).toEqual(ActionTypes.ADMIN_APPS_REQUEST_FAILURE)
  })
})
