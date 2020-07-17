import * as Yup from 'yup'
import { telephoneRegex, personNameRegex, letterNumberSpaceRegex } from '@reapit/utils'
import errorMessages from '@/constants/error-messages'
import { formFieldsContactInfomation } from './form-fields'

const { nameField, jobTitleField, telephoneField, companyNameField } = formFieldsContactInfomation

const { FIELD_REQUIRED, MAXIMUM_CHARACTER_LENGTH } = errorMessages

export const validationSchema = Yup.object().shape({
  [companyNameField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, companyNameField.errorMessage)
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  [nameField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(personNameRegex, nameField.errorMessage)
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),

  [telephoneField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(telephoneRegex, telephoneField.errorMessage)
    .max(20, MAXIMUM_CHARACTER_LENGTH(20)),

  [jobTitleField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, jobTitleField.errorMessage)
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),
})
