import {
  adminDevManagementRequestData,
  adminDevManagementRequestDataFailure,
  adminDevManagementLoading,
  adminDevManagementReceiveData,
} from '../admin-dev-management'
import ActionTypes from '../../constants/action-types'

describe('admin dev management actions', () => {
  it('should create a adminDevManagementRequestData action', () => {
    expect(adminDevManagementRequestData.type).toEqual(ActionTypes.ADMIN_DEV_MANAGEMENT_REQUEST_DATA)
  })

  it('should create a adminDevManagementRequestDataFailure action', () => {
    expect(adminDevManagementRequestDataFailure.type).toEqual(ActionTypes.ADMIN_DEV_MANAGEMENT_REQUEST_FAILURE)
  })

  it('should create a adminDevManagementLoading action', () => {
    expect(adminDevManagementLoading.type).toEqual(ActionTypes.ADMIN_DEV_MANAGEMENT_LOADING)
  })

  it('should create a adminDevManagementReceiveData action', () => {
    expect(adminDevManagementReceiveData.type).toEqual(ActionTypes.ADMIN_DEV_MANAGEMENT_RECEIVE_DATA)
  })
})
