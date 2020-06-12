import { telephoneRegex } from './regex'

export function isValidTelephone(phone: string) {
  // eslint-disable-next-line
  return telephoneRegex.test(phone)
}
