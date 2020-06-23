import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import { letterNumberSpaceRegex } from '@reapit/elements'

const { FIELD_REQUIRED } = errorMessages

const { name } = formFields

const submitAppValidationSchema = Yup.object().shape({
  [name.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, name.errorMessage),
})

export default submitAppValidationSchema
