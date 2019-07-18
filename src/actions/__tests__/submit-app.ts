import { submitAppSetFormState, submitApp } from '../submit-app'
import ActionTypes from '../../constants/action-types'

describe('submitApp actions', () => {
  it('should create a submitApp action', () => {
    expect(submitApp.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_APP)
  })

  it('should create a submitAppSetFormState action', () => {
    expect(submitAppSetFormState.type).toEqual(ActionTypes.DEVELOPER_SUBMIT_APP_SET_FORM_STATE)
  })
})
