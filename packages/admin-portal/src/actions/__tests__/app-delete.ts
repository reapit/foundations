import {
  setDeleteAppInitFormState,
  requestDeleteAppSuccess,
  requestDeleteAppFailed,
  requestDeleteApp,
} from '../app-delete'

import ActionTypes from '../../constants/action-types'

describe('app delete actions', () => {
  it('should create a setDeleteAppInitFormState action', () => {
    expect(setDeleteAppInitFormState.type).toEqual(ActionTypes.SET_APP_DELETE_INIT_FORM_STATE)
  })
  it('should create a requestDeleteAppSuccess action', () => {
    expect(requestDeleteAppSuccess.type).toEqual(ActionTypes.DELETE_REQUEST_APP_SUCCESS)
  })
  it('should create a requestDeleteAppFailed action', () => {
    expect(requestDeleteAppFailed.type).toEqual(ActionTypes.DELETE_REQUEST_APP_FAILED)
  })
  it('should create a requestDeleteApp action', () => {
    expect(requestDeleteApp.type).toEqual(ActionTypes.DELETE_REQUEST_APP)
  })
})
