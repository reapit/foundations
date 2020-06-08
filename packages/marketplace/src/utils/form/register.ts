import { isEmail, isValidPersonName } from '../validate'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'

export type RegisterFormError = Partial<CreateDeveloperModel>

export function registerValidate(values: CreateDeveloperModel) {
  let errors = {} as RegisterFormError

  if (!values.name || !values.name.trim()) {
    errors.name = 'Required'
  } else if (!isValidPersonName(values.name)) {
    errors.name = 'Invalid full name'
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
