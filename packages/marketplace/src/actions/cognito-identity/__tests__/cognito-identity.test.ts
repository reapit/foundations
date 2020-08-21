import { changePassword, changePasswordSuccess, changePasswordFailed } from '../cognito-identity'
import ActionTypes from '@/constants/action-types'

describe('settings actions', () => {
  it('should create a changePassword action', () => {
    expect(changePassword.type).toEqual(ActionTypes.CHANGE_PASSWORD)
    const mockPassword = { currentPassword: '', password: '', confirmPassword: '', email: '' }
    expect(changePassword(mockPassword).data).toEqual(mockPassword)
  })

  it('should create a changePasswordSuccess action', () => {
    expect(changePasswordSuccess.type).toEqual(ActionTypes.CHANGE_PASSWORD_SUCCESS)
    expect(changePasswordSuccess().data).toEqual(undefined)
  })

  it('should create a changePasswordFailed action', () => {
    expect(changePasswordFailed.type).toEqual(ActionTypes.CHANGE_PASSWORD_FAILED)
    expect(changePasswordFailed('test').data).toEqual('test')
  })
})
