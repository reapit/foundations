import { resetPassword, resetPasswordLoading } from '../reset-password'
import ActionTypes from '../../constants/action-types'

describe('resetPassword actions', () => {
  it('should create a resetPassword action', () => {
    expect(resetPassword.type).toEqual(ActionTypes.RESET_PASSWORD)
  })

  it('should create a resetPasswordSetFormState action', () => {
    expect(resetPasswordLoading.type).toEqual(ActionTypes.RESET_PASSWORD_LOADING)
  })
})
