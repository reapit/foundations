import * as Yup from 'yup'
import { telephoneRegex, websiteRegex } from '@reapit/utils'
import { formFields } from './form-fields'
import errorMessage from '@/constants/error-messages'

const { MAXIMUM_CHARACTER_LENGTH, FIELD_REQUIRED } = errorMessage

const {
  companyNameField,
  telephoneField,
  aboutField,
  line1Field,
  line2Field,
  line3Field,
  line4Field,
  websiteField,
  postcodeField,
  taxNumberField,
  buildingNameField,
  buildingNumberField,
  nationalInsuranceField,
  registrationNumberField,
  noRegistrationNumberField,
  noTaxRegistrationField,
  countryIdField,
} = formFields

export const companyInformationFormSchema = Yup.object().shape({
  [companyNameField.name]: Yup.string().trim().required(FIELD_REQUIRED).max(250, MAXIMUM_CHARACTER_LENGTH(250)),

  [telephoneField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(telephoneRegex, telephoneField.errorMessage)
    .max(20, MAXIMUM_CHARACTER_LENGTH(20)),

  [websiteField.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(websiteRegex, websiteField.errorMessage)
    .max(100, MAXIMUM_CHARACTER_LENGTH(100)),

  [noTaxRegistrationField.name]: Yup.boolean(),

  [taxNumberField.name]: Yup.string().when(noTaxRegistrationField.name, {
    is: false,
    then: Yup.string().trim().required(FIELD_REQUIRED).max(50, MAXIMUM_CHARACTER_LENGTH(50)),
    otherwise: Yup.string().notRequired(),
  }),

  [noRegistrationNumberField.name]: Yup.boolean(),

  // when unchecked "NO COMPANY REGISTRATION NUMBER" -> validate
  [registrationNumberField.name]: Yup.string().when(noRegistrationNumberField.name, {
    is: false,
    then: Yup.string().trim().required(FIELD_REQUIRED).max(50, MAXIMUM_CHARACTER_LENGTH(50)),
    otherwise: Yup.string().notRequired(),
  }),

  [aboutField.name]: Yup.string().trim().required(FIELD_REQUIRED).max(250, MAXIMUM_CHARACTER_LENGTH(250)),

  // when checked "NO COMPANY REGISTRATION NUMBER" -> validate
  [nationalInsuranceField.name]: Yup.string().when(noRegistrationNumberField.name, {
    is: true,
    then: Yup.string().trim().required(FIELD_REQUIRED).max(20, MAXIMUM_CHARACTER_LENGTH(20)),
    otherwise: Yup.string().notRequired(),
  }),

  [buildingNameField.name]: Yup.string().trim().max(35, MAXIMUM_CHARACTER_LENGTH(35)),

  [buildingNumberField.name]: Yup.string().trim().max(8, MAXIMUM_CHARACTER_LENGTH(8)),

  [line1Field.name]: Yup.string().trim().required(FIELD_REQUIRED).max(35, MAXIMUM_CHARACTER_LENGTH(35)),

  [line2Field.name]: Yup.string().trim().max(30, MAXIMUM_CHARACTER_LENGTH(30)),

  [line3Field.name]: Yup.string().trim().max(30, MAXIMUM_CHARACTER_LENGTH(30)),

  [line4Field.name]: Yup.string().trim().required(FIELD_REQUIRED).max(30, MAXIMUM_CHARACTER_LENGTH(30)),

  [postcodeField.name]: Yup.string().trim().required(FIELD_REQUIRED).max(9, MAXIMUM_CHARACTER_LENGTH(9)),
  [countryIdField.name]: Yup.string().trim().required(FIELD_REQUIRED),
})
