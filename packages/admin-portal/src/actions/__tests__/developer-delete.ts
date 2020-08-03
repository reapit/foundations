import {
  setRequestDeveloperStatusFormState,
  setRequestDeveloperStatusFormStateLoading,
  setRequestDeveloperStatusFormStateFailed,
  setRequestDeveloperStatusFormStateSuccess,
  initRequestDeveloperStatusFormState,
} from '../developer-set-status'
import ActionTypes from '../../constants/action-types'

describe('developer delete actions', () => {
  it('should create a fetchAppDetailLoading action', () => {
    expect(setRequestDeveloperStatusFormStateLoading.type).toEqual(ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE_LOADING)
  })

  it('should create a developerDeleteRequest action', () => {
    expect(setRequestDeveloperStatusFormState.type).toEqual(ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE)
  })

  it('should create a developerDeleteRequestFailed action', () => {
    expect(setRequestDeveloperStatusFormStateFailed.type).toEqual(ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE_FAILED)
  })

  it('should create a developerDeleteRequestSuccess action', () => {
    expect(setRequestDeveloperStatusFormStateSuccess.type).toEqual(ActionTypes.SET_DEVELOPER_STATUS_FORM_STATE_SUCCESS)
  })

  it('should create a developerDeleteSetInitFormState action', () => {
    expect(initRequestDeveloperStatusFormState.type).toEqual(ActionTypes.INIT_REQUEST_DEVELOPER_STATUS_FORM_STATE)
  })
})
