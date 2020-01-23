import { submitEmail, forgotPasswordLoading } from '../forgot-password'
import ActionTypes from '../../constants/action-types'

describe('forgotPassword actions', () => {
  it('should create a submitEmail action', () => {
    expect(submitEmail.type).toEqual(ActionTypes.FORGOT_PASSWORD_SUBMIT_EMAIL)
    expect(submitEmail('abc@gmail.com').data).toEqual('abc@gmail.com')
  })

  it('should create a forgotPasswordLoading action', () => {
    expect(forgotPasswordLoading.type).toEqual(ActionTypes.FORGOT_PASSWORD_LOADING)
    expect(forgotPasswordLoading(true).data).toEqual(true)
  })
})
