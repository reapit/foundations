/* istanbul ignore file */
import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '../../constants/error-messages'
import { personNameRegex, telephoneRegex, emailRegex } from '@reapit/utils-common'
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
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      {
        message: 'Must be a valid website',
      },
    ),
  registrationNumber: Yup.string().required('Required'),
  taxNumber: Yup.string().required('Required'),
})

export const thirdStepValidationSchema = Yup.object().shape({
  companyAddress: Yup.object().shape({
    line1: Yup.string().required('Required'),
    line2: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
    postcode: Yup.string().required('Required'),
  }),
})

export const forthStepValidationSchema = Yup.object().shape({
  notificationEmail: Yup.string().email().optional(),
})
