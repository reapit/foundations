import { myAppsLoading, myAppsReceiveData, myAppsRequestData, myAppsClearData } from '../my-apps'
import ActionTypes from '../../constants/action-types'
import { myAppsDataStub } from '../../sagas/__stubs__/my-apps'

describe('myApps actions', () => {
  it('should create a myAppsLoading action', () => {
    expect(myAppsLoading.type).toEqual(ActionTypes.MY_APPS_LOADING)
    expect(myAppsLoading(true).data).toEqual(true)
  })

  it('should create a myAppsReceiveData action', () => {
    expect(myAppsReceiveData.type).toEqual(ActionTypes.MY_APPS_RECEIVE_DATA)
    expect(myAppsReceiveData(myAppsDataStub).data).toEqual(myAppsDataStub)
  })

  it('should create a myAppsRequestData action', () => {
    expect(myAppsRequestData.type).toEqual(ActionTypes.MY_APPS_REQUEST_DATA)
    expect(myAppsRequestData().data).toEqual(undefined)
  })

  it('should create a myAppsClearData action', () => {
    expect(myAppsClearData.type).toEqual(ActionTypes.MY_APPS_CLEAR_DATA)
    expect(myAppsClearData(null).data).toEqual(null)
  })
})
