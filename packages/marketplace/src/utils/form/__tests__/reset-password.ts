import { validate } from '../reset-password'
import { ResetPasswordValues } from '@/components/pages/reset-password/reset-password-form'
import errorMessages from '@/constants/error-messages'

describe('changePasswordValidation', () => {
  it('validate invalid password', () => {
    const input: ResetPasswordValues = {
      password: 'newInvalidPassoword',
      confirmPassword: 'newInvalidPassoword'
    }
    expect(validate(input)).toEqual({
      password: errorMessages.FIELD_INVALID_PASSWORD
    })
  })

  it('validate passwords are not match', () => {
    const input: ResetPasswordValues = {
      password: 'Password1',
      confirmPassword: 'Password2'
    }
    expect(validate(input)).toEqual({
      confirmPassword: 'Passwords do not match.'
    })
  })

  it('return empty object it everything is valid', () => {
    const input: ResetPasswordValues = {
      password: 'Password1',
      confirmPassword: 'Password1'
    }
    expect(validate(input)).toEqual({})
  })
})
