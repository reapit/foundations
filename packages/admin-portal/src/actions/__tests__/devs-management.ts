import {
  devsManagementRequestData,
  devsManagementRequestDataFailure,
  devsManagementLoading,
  devsManagementReceiveData,
} from '../devs-management'
import ActionTypes from '../../constants/action-types'

describe('admin dev management actions', () => {
  it('should create a devsManagementRequestData action', () => {
    expect(devsManagementRequestData.type).toEqual(ActionTypes.DEVS_MANAGEMENT_REQUEST_DATA)
  })

  it('should create a devsManagementRequestDataFailure action', () => {
    expect(devsManagementRequestDataFailure.type).toEqual(ActionTypes.DEVS_MANAGEMENT_REQUEST_FAILURE)
  })

  it('should create a devsManagementLoading action', () => {
    expect(devsManagementLoading.type).toEqual(ActionTypes.DEVS_MANAGEMENT_LOADING)
  })

  it('should create a devsManagementReceiveData action', () => {
    expect(devsManagementReceiveData.type).toEqual(ActionTypes.DEVS_MANAGEMENT_RECEIVE_DATA)
  })
})
