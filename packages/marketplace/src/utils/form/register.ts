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

  return errors
}
