import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessage from '@/constants/error-messages'

const { MAXIMUM_CHARACTER_LENGTH, FIELD_REQUIRED } = errorMessage

const {
  companyNameField,
  telephoneField,
  aboutField,
  emailField,
  line1Field,
  line2Field,
  line3Field,
  line4Field,
  websiteField,
  postcodeField,
  countryIdField,
  taxNumberField,
  buildingNameField,
  iconImageUrlField,
  buildingNumberField,
  nationalInsuranceField,
  noTaxRegistrationField,
  registrationNumberField,
  noRegistrationNumberField,
} = formFields

export const companyInformationFormSchema = Yup.object().shape({
  // Validation TBC
  [companyNameField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, companyNameField.errorMessage)
    .max(250, MAXIMUM_CHARACTER_LENGTH(250)),

  [telephoneField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(telephoneRegex, telephoneField.errorMessage)
    .max(20, MAXIMUM_CHARACTER_LENGTH(20)),

  [websiteField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(letterNumberSpaceRegex, jobTitleField.errorMessage)
    .max(256, MAXIMUM_CHARACTER_LENGTH(256)),
})
