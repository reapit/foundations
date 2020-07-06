import { myAppsLoading, myAppsReceiveData, myAppsRequestData, myAppsClearData } from '../my-apps'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'

describe('myApps actions', () => {
  it('should create a myAppsLoading action', () => {
    expect(myAppsLoading.type).toEqual(ActionTypes.MY_APPS_LOADING)
    expect(myAppsLoading(true).data).toEqual(true)
  })

  it('should create a myAppsReceiveData action', () => {
    expect(myAppsReceiveData.type).toEqual(ActionTypes.MY_APPS_RECEIVE_DATA)
    expect(myAppsReceiveData(appsDataStub).data).toEqual(appsDataStub)
  })

  it('should create a myAppsRequestData action', () => {
    expect(myAppsRequestData.type).toEqual(ActionTypes.MY_APPS_REQUEST_DATA)
    expect(myAppsRequestData(1).data).toEqual(1)
  })

  it('should create a myAppsClearData action', () => {
    expect(myAppsClearData.type).toEqual(ActionTypes.MY_APPS_CLEAR_DATA)
    expect(myAppsClearData(null).data).toEqual(null)
  })
})
