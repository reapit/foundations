/* istanbul ignore file */
import { hasSpecialChars, isValidHttpsUrl } from '@reapit/utils-common'
import { bool, object, string } from 'yup'

export const specialCharsTest = {
  name: 'hasNoSpecialChars',
  message: 'Special characters are not permitted',
  test: (value?: string) => {
    if (!value) return true
    return !hasSpecialChars(value)
  },
}

export const validationSchema = object({
  vendorName: string().test(specialCharsTest),
  integrationKey: string().test(specialCharsTest),
  passKey: string().test(specialCharsTest),
  companyName: string().test(specialCharsTest),
  logoUri: string().test({
    name: 'isValidTermsAndConditionsUrl',
    message: 'Must be a valid https url',
    test: (value) => {
      if (!value) return true
      return isValidHttpsUrl(value)
    },
  }),
  isLive: bool(),
})
