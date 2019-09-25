import { isEmail } from '../validate'
import { LoginFormValues } from '@/components/pages/login'

export interface LoginFormError {
  userName?: string
  password?: string
}
export function validate(values: LoginFormValues) {
  let errors = {} as LoginFormError

  if (!values.userName) {
    errors.userName = 'Required'
  } else if (!isEmail(values.userName)) {
    errors.userName = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}
