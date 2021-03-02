import * as Yup from 'yup'
import formFields from './form-fields'
import errorMessages from '@/constants/error-messages'
import { letterNumberSpaceRegex } from '@reapit/elements'

const { MAXIMUM_CHARACTER_LENGTH, FIELD_REQUIRED, FIELD_GENERAL_ERROR } = errorMessages
const { nameField, addressField } = formFields

const clientSearchValidationSchema = Yup.object().shape({
  [nameField.name]: Yup.string()
    .trim()
    .max(256, MAXIMUM_CHARACTER_LENGTH(256))
    .matches(letterNumberSpaceRegex, FIELD_GENERAL_ERROR(nameField.name))
    .when([addressField.name], {
      is: (address) => !address,
      then: Yup.string().required(FIELD_REQUIRED),
    }),
  [addressField.name]: Yup.string()
    .trim()
    .matches(letterNumberSpaceRegex, FIELD_GENERAL_ERROR(addressField.name))
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),
})

export default clientSearchValidationSchema
