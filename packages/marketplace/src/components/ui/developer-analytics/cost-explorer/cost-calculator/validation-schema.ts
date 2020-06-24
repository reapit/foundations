import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'
import { numberOnlyRegex } from '@reapit/utils'

const { apiCallsField, endpointsUsedField } = formFields

export const validationSchema = Yup.object().shape({
  [endpointsUsedField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED),

  [apiCallsField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(numberOnlyRegex, apiCallsField.errorMessage),
})
