import { hasSpecialChars } from '@reapit/utils-common'

export const specialCharsTest = {
  name: 'hasNoSpecialChars',
  message: 'Special characters are not permitted',
  test: (value?: string) => {
    if (!value) return true
    return !hasSpecialChars(value)
  },
}

export const yarnNpmTest = {
  name: 'isYarnOrNpm',
  message: 'Package manager must be yarn or npm',
  test: (value?: string) => {
    return value === 'yarn' || value === 'npm'
  },
}
