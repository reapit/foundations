import { appsReceiveData, appsRequestData, appsRequestFailure } from '../apps-management'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '@/sagas/apps/__stubs__/apps'

describe('adminApps actions', () => {
  it('should create a appsReceiveData action', () => {
    expect(appsReceiveData.type).toEqual(ActionTypes.APPS_RECEIVE_DATA)
    expect(appsReceiveData(appsDataStub.data).data).toEqual(appsDataStub.data)
  })

  it('should create a appsRequestData action', () => {
    expect(appsRequestData.type).toEqual(ActionTypes.APPS_REQUEST_DATA)
    expect(appsRequestData({ pageNumber: 1 }).data).toEqual({ pageNumber: 1 })
  })

  it('should create a appsRequestFailure action', () => {
    expect(appsRequestFailure.type).toEqual(ActionTypes.APPS_REQUEST_FAILURE)
  })
})
