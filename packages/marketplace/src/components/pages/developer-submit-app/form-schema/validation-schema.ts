import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import { letterNumberSpaceRegex, telephoneRegex } from '@reapit/elements'

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH } = errorMessages

const { name, telephone } = formFields

const submitAppValidationSchema = Yup.object().shape({
  [name.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, name.errorMessage)
    .max(100, MAXIMUM_CHARACTER_LENGTH(100)),
  [telephone.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(telephoneRegex, telephone.errorMessage)
    .max(20, MAXIMUM_CHARACTER_LENGTH(20)),
})

export default submitAppValidationSchema
