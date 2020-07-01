import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'

const { FIELD_REQUIRED } = errorMessages

const { vatNumberField, officeEmailField } = formFields
export const companyInformationFormSchema = Yup.object().shape({
  [vatNumberField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),
  [officeEmailField.name]: Yup.string().email(),
})
