/* istanbul ignore file */
import { emailRegex, isValidHttpsUrl, telephoneRegex } from '@reapit/utils-common'
import errorMessage from '@/constants/error-messages'
import { boolean, object, string } from 'yup'

const { MAXIMUM_CHARACTER_LENGTH, FIELD_REQUIRED } = errorMessage

export const companyInformationValidationSchema = object().shape({
  company: string().trim().required(FIELD_REQUIRED).max(250, MAXIMUM_CHARACTER_LENGTH(250)),

  telephone: string()
    .trim()
    .required(FIELD_REQUIRED)
    .matches(telephoneRegex, 'Invalid telephone number')
    .max(20, MAXIMUM_CHARACTER_LENGTH(20)),

  website: string()
    .trim()
    .required(FIELD_REQUIRED)
    .test({
      message: 'Invalid website address',
      test: (value) => {
        if (!value) return true
        return isValidHttpsUrl(value)
      },
    })
    .max(100, MAXIMUM_CHARACTER_LENGTH(100)),

  noTaxRegistration: boolean(),

  taxNumber: string().when('noTaxRegistration', {
    is: false,
    then: string().trim().required(FIELD_REQUIRED).max(50, MAXIMUM_CHARACTER_LENGTH(50)),
    otherwise: string().notRequired(),
  }),

  noRegistrationNumber: boolean(),

  // when unchecked "NO COMPANY REGISTRATION NUMBER" -> validate
  registrationNumber: string().when('noRegistrationNumber', {
    is: false,
    then: string().trim().required(FIELD_REQUIRED).max(50, MAXIMUM_CHARACTER_LENGTH(50)),
    otherwise: string().notRequired(),
  }),

  about: string().trim().required(FIELD_REQUIRED).max(250, MAXIMUM_CHARACTER_LENGTH(250)),

  // when checked "NO COMPANY REGISTRATION NUMBER" -> validate
  nationalInsurance: string().when('noRegistrationNumber', {
    is: true,
    then: string().trim().required(FIELD_REQUIRED).max(20, MAXIMUM_CHARACTER_LENGTH(20)),
    otherwise: string().notRequired(),
  }),

  buildingName: string().trim().max(35, MAXIMUM_CHARACTER_LENGTH(35)),

  buildingNumber: string().trim().max(8, MAXIMUM_CHARACTER_LENGTH(8)),

  line1: string().trim().required(FIELD_REQUIRED).max(35, MAXIMUM_CHARACTER_LENGTH(35)),

  line2: string().trim().max(30, MAXIMUM_CHARACTER_LENGTH(30)),

  line3: string().trim().max(30, MAXIMUM_CHARACTER_LENGTH(30)),

  line4: string().trim().required(FIELD_REQUIRED).max(30, MAXIMUM_CHARACTER_LENGTH(30)),

  postcode: string().trim().required(FIELD_REQUIRED).max(9, MAXIMUM_CHARACTER_LENGTH(9)),
  countryId: string().trim().required(FIELD_REQUIRED),

  billingEmail: string().test({
    message: 'Invalid email',
    test: (value) => {
      if (!value) return true
      const result = value.match(emailRegex)

      return result !== null
    },
  }),
})
