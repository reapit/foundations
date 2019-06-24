import { isEmail } from '../validate'
import { LoginFormValues } from '../../components/pages/login'
import {} from 'formik'

export interface LoginFormError {
  email?: string
  password?: string
}
export function validate(values: LoginFormValues) {
  let errors = {} as LoginFormError

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}
