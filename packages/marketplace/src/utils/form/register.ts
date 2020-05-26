import { isEmail } from '../validate'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'

export type RegisterFormError = Partial<CreateDeveloperModel>

export function registerValidate(values: CreateDeveloperModel) {
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
