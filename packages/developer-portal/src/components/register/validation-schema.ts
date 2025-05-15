/* istanbul ignore file */
import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '../../constants/error-messages'
import { personNameRegex, telephoneRegex, emailRegex, isValidHttpsUrl } from '@reapit/utils-common'
import { specialCharsTest } from '../../utils/yup'

const { nameField, companyNameField, emailField, telephoneField } = formFields

export const firstStepValidationSchema = Yup.object().shape({
  [nameField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(personNameRegex, nameField.errorMessage)
    .test(specialCharsTest),
  [emailField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(emailRegex, emailField.errorMessage),
})

export const secondStepValidationSchema = Yup.object().shape({
  [telephoneField.name]: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(telephoneRegex, telephoneField.errorMessage)
    .test(specialCharsTest),
  [companyNameField.name]: Yup.string().trim().required(errorMessages.FIELD_REQUIRED).test(specialCharsTest),
  website: Yup.string()
    .trim()
    .required('Required')
    .test({
      message: 'Invalid website address',
      test: (value) => {
        if (!value) return true
        return isValidHttpsUrl(value)
      },
    })
    .max(100, errorMessages.MAXIMUM_CHARACTER_LENGTH(100)),
  registrationNumber: Yup.string().required('Required'),
  taxNumber: Yup.string().required('Required'),
})

export const thirdStepValidationSchema = Yup.object().shape({
  companyAddress: Yup.object().shape({
    line1: Yup.string().required('Required').max(35, 'Address line 1 should not exceed 35 characters'),
    line2: Yup.string().required('Required').max(30, 'Address line 2 should not exceed 30 characters'),
    countryId: Yup.string().required('Required'),
    postcode: Yup.string().required('Required').max(9, 'Postcode must be less than 10 characters'),
  }),
})

export const forthStepValidationSchema = Yup.object().shape({
  notificationEmail: Yup.string().email().optional(),
})
