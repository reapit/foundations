/* istanbul ignore file */
import { emailRegex, hasSpecialChars } from '@reapit/utils-common'
import { object, string } from 'yup'
import { getCardType, validateCard, validateCardExpires, validateSecureCode } from './payment-card-helpers'

export const specialCharsTest = {
  name: 'hasNoSpecialChars',
  message: 'Special characters are not permitted',
  test: (value?: string) => {
    if (!value) return true
    return !hasSpecialChars(value)
  },
}

export const paymentValidationSchema = object().shape({
  customerFirstName: string().trim().required('Required').test(specialCharsTest),
  customerLastName: string().trim().required('Required').test(specialCharsTest),
  address1: string().trim().required('Required').test(specialCharsTest),
  city: string().trim().required('Required').test(specialCharsTest),
  postalCode: string().trim().required('Required').test(specialCharsTest),
  country: string().trim().required('Required'),
  cardholderName: string().trim().required('Required').test(specialCharsTest),
  cardNumber: string()
    .trim()
    .required('Required')
    .test({
      name: 'isValidCard',
      message: 'Card number is not in the correct format',
      test: (value) => {
        if (!value) return true
        return validateCard(value)
      },
    }),
  expiryDate: string()
    .trim()
    .required('Required')
    .test({
      name: 'isValidExpires',
      message: 'Card expiry is invalid',
      test: (value) => {
        if (!value) return true
        return validateCardExpires(value)
      },
    }),
  securityCode: string()
    .trim()
    .required('Required')
    .when('cardNumber', (cardNumber: string, schema) => {
      const cardType = getCardType(cardNumber)

      return schema.test({
        name: 'isValidCsv',
        message: 'Card CSV is invalid',
        test: (value) => {
          if (!value) return true
          return validateSecureCode(value, cardType)
        },
      })
    }),
  cardIdentifier: string(),
  email: string().trim().required('Required').matches(emailRegex, 'Email is not in the correct format'),
})

export const resendConfirmationSchema = object().shape({
  customerFirstName: string().trim().required('Required').test(specialCharsTest),
  customerLastName: string().trim().required('Required').test(specialCharsTest),
  email: string().trim().required('Required').matches(emailRegex, 'Email is not in the correct format'),
})
