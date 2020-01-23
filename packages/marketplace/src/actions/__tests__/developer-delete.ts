import {
  developerSetStatusRequest,
  developerSetStatusRequestLoading,
  developerSetStatusRequestFailure,
  developerSetStatusRequestSuccess,
  developerSetStatusSetInitFormState
} from '../developer-set-status'
import ActionTypes from '../../constants/action-types'

describe('developer delete actions', () => {
  it('should create a appDetailLoading action', () => {
    expect(developerSetStatusRequestLoading.type).toEqual(ActionTypes.DEVELOPER_SET_STATUS_REQUEST_LOADING)
  })

  it('should create a developerDeleteRequest action', () => {
    expect(developerSetStatusRequest.type).toEqual(ActionTypes.DEVELOPER_SET_STATUS_REQUEST)
  })

  it('should create a developerDeleteRequestFailure action', () => {
    expect(developerSetStatusRequestFailure.type).toEqual(ActionTypes.DEVELOPER_SET_STATUS_REQUEST_FAILURE)
  })

  it('should create a developerDeleteRequestSuccess action', () => {
    expect(developerSetStatusRequestSuccess.type).toEqual(ActionTypes.DEVELOPER_SET_STATUS_REQUEST_SUCCESS)
  })

  it('should create a developerDeleteSetInitFormState action', () => {
    expect(developerSetStatusSetInitFormState.type).toEqual(ActionTypes.DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE)
  })
})
