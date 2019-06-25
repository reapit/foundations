import { isEmail } from '../validate'
import { RegisterFormValues } from '@/components/pages/register'

export interface RegisterFormError {
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  confirmPassword?: string
}

export function registerValidate(values: RegisterFormValues) {
  let errors = {} as RegisterFormError

  if (!values.firstName) {
    errors.firstName = 'Required'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else {
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Required'
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Password does not match'
    }
  }

  return errors
}
