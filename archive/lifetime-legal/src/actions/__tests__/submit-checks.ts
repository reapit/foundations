import { submitChecks, submitChecksSetFormState } from '../submit-checks'
import ActionTypes from '../../constants/action-types'

describe('submitChecks actions', () => {
  it('should create a submitChecks action', () => {
    expect(submitChecks.type).toEqual(ActionTypes.SUBMIT_CHECKS)
  })

  it('should create a submitChecksSetFormState action', () => {
    expect(submitChecksSetFormState.type).toEqual(ActionTypes.SUBMIT_CHECKS_SET_FORM_STATE)
  })
})
