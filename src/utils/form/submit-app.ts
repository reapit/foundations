import { SubmitAppFormValues } from '@/components/pages/developer-submit-app'

export interface SubmitAppFormError {
  appName?: string
  companyName?: string
  companyReg?: string
  contactPhone?: string
  lineOne?: string
  town?: string
  country?: string
  postcode?: string
}

export function validate(values: SubmitAppFormValues) {
  let errors = {} as SubmitAppFormError

  if (!values.appName) {
    errors.appName = 'Required'
  }

  if (!values.companyName) {
    errors.companyName = 'Required'
  }

  return errors
}
