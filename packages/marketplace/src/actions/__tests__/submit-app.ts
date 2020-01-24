import {
  submitAppSetFormState,
  submitApp,
  submitAppLoading,
  submitAppRequestData,
  submitAppReceiveData,
} from '../submit-app'
import ActionTypes from '../../constants/action-types'

describe('submitApp actions', () => {
  it('should create a submitApp action', () => {
    expect(submitApp.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_APP)
  })

  it('should create a submitAppSetFormState action', () => {
    expect(submitAppSetFormState.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
  })

  it('should create a submitAppLoading action', () => {
    expect(submitAppLoading.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_APP_LOADING)
  })

  it('should create a submitAppRequestData action', () => {
    expect(submitAppRequestData.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_APP_REQUEST_DATA)
  })

  it('should create a submitAppReceiveData action', () => {
    expect(submitAppReceiveData.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_APP_RECEIVE_DATA)
  })
})
