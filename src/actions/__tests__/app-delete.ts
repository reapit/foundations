import {
  appDeleteSetInitFormState,
  appDeleteRequestSuccess,
  appDeleteRequestFailure,
  appDeleteRequest,
  appDeleteRequestLoading
} from '../app-delete'

import ActionTypes from '../../constants/action-types'

describe('app delete actions', () => {
  it('should create a appDeleteSetInitFormState action', () => {
    expect(appDeleteSetInitFormState.type).toEqual(ActionTypes.APP_DELETE_SET_INIT_FORM_STATE)
  })
  it('should create a appDeleteRequestSuccess action', () => {
    expect(appDeleteRequestSuccess.type).toEqual(ActionTypes.APP_DELETE_REQUEST_SUCCESS)
  })
  it('should create a appDeleteRequestFailure action', () => {
    expect(appDeleteRequestFailure.type).toEqual(ActionTypes.APP_DELETE_REQUEST_FAILURE)
  })
  it('should create a appDeleteRequest action', () => {
    expect(appDeleteRequest.type).toEqual(ActionTypes.APP_DELETE_REQUEST)
  })
  it('should create a appDeleteRequestLoading action', () => {
    expect(appDeleteRequestLoading.type).toEqual(ActionTypes.APP_DELETE_REQUEST_LOADING)
  })
})
