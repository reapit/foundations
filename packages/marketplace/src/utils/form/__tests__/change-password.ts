import { validate } from '../change-password'
import { ChangePasswordValues } from '../../../components/pages/settings/change-password-form'
import errorMessages from '@/constants/error-messages'

describe('changePasswordValidation', () => {
  it('validate required fields', () => {
    const input: ChangePasswordValues = {
      currentPassword: '',
      password: 'Password1',
      confirmPassword: ''
    }

    const validateRequiredKeys = ['currentPassword', 'confirmPassword']

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }
    expect(validate(input)).toEqual(output)
  })

  it('validate invalid password', () => {
    const input: ChangePasswordValues = {
      currentPassword: 'mypassword',
      password: 'newInvalidPassoword',
      confirmPassword: 'newInvalidPassoword'
    }
    expect(validate(input)).toEqual({
      password: errorMessages.FIELD_INVALID_PASSWORD
    })
  })

  it('validate passwords are not match', () => {
    const input: ChangePasswordValues = {
      currentPassword: 'mypassword',
      password: 'Password1',
      confirmPassword: 'Password2'
    }
    expect(validate(input)).toEqual({
      confirmPassword: 'Passwords do not match.'
    })
  })

  it('return empty object it everything is valid', () => {
    const input: ChangePasswordValues = {
      currentPassword: 'mypassword',
      password: 'Password1',
      confirmPassword: 'Password1'
    }
    expect(validate(input)).toEqual({})
  })
})
