import * as Yup from 'yup'
import { letterNumberSpaceRegex } from '@reapit/elements'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'

const { search, searchBy } = formFields

export const validationSchema = Yup.object().shape({
  [search.name]: Yup.string()
    .trim()
    .max(256, errorMessages.MAXIMUM_CHARACTER_LENGTH(256))
    .matches(letterNumberSpaceRegex, search.errorMessage),
  [searchBy.name]: Yup.string().required(),
})
