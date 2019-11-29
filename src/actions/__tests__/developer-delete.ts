import {
  developerDeleteRequest,
  developerDeleteRequestLoading,
  developerDeleteRequestFailure,
  developerDeleteRequestSuccess,
  developerDeleteSetInitFormState
} from '../developer-delete'
import ActionTypes from '../../constants/action-types'

describe('developer delete actions', () => {
  it('should create a appDetailLoading action', () => {
    expect(developerDeleteRequestLoading.type).toEqual(ActionTypes.DEVELOPER_DELETE_REQUEST_LOADING)
  })

  it('should create a developerDeleteRequest action', () => {
    expect(developerDeleteRequest.type).toEqual(ActionTypes.DEVELOPER_DELETE_REQUEST)
  })

  it('should create a developerDeleteRequestFailure action', () => {
    expect(developerDeleteRequestFailure.type).toEqual(ActionTypes.DEVELOPER_DELETE_REQUEST_FAILURE)
  })

  it('should create a developerDeleteRequestSuccess action', () => {
    expect(developerDeleteRequestSuccess.type).toEqual(ActionTypes.DEVELOPER_DELETE_REQUEST_SUCCESS)
  })

  it('should create a developerDeleteSetInitFormState action', () => {
    expect(developerDeleteSetInitFormState.type).toEqual(ActionTypes.DEVELOPER_DELETE_SET_INIT_FORM_STATE)
  })
})
