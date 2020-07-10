import * as Yup from 'yup'
import { httpsUrlRegex } from '@reapit/utils'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'

const { webhookUrlField } = formFields

export const validationSchema = Yup.object().shape({
  [webhookUrlField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(httpsUrlRegex, webhookUrlField.errorMessage),
})
