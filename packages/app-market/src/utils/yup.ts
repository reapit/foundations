import { hasSpecialChars } from '@reapit/utils-common'

export const specialCharsTest = {
  name: 'hasNoSpecialChars',
  message: 'Special characters are not permitted',
  test: (value?: string) => {
    if (!value) return true
    return !hasSpecialChars(value)
  },
}
