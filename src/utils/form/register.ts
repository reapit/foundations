import { isEmail } from '../validate'
import { RegisterFormValues } from '@/components/pages/register'

export type RegisterFormError = Partial<RegisterFormValues>

export function registerValidate(values: RegisterFormValues) {
  let errors = {} as RegisterFormError

  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.companyName) {
    errors.companyName = 'Required'
  }

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.telephone) {
    errors.telephone = 'Required'
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

  if (!values.agreedTerms) {
    errors.agreedTerms = 'Required'
  }

  return errors
}
