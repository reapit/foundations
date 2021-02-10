import { submitComplete, submitCompleteSetFormState } from '../success'
import ActionTypes from '../../constants/action-types'

describe('success actions', () => {
  it('should create a submitComplete action', () => {
    expect(submitComplete.type).toEqual(ActionTypes.SUBMIT_COMPLETE)
  })

  it('should create a submitCompleteSetFormState action', () => {
    expect(submitCompleteSetFormState.type).toEqual(ActionTypes.SUBMIT_COMPLETE_SET_FORM_STATE)
  })
})
