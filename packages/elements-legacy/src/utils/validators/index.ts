export type PartialRecord<K extends keyof any, T> = { [P in K]?: T }

export { validateBase } from './validate-base'
export {
  minLengthValidator,
  maxLengthValidator,
  validateMinCharacterLength,
  validateMaxCharacterLength,
} from './validate-character-length'
export { validateEmail, isEmail } from './validate-email'
export { isNumberOnly } from './validate-number'
export { validateRequire, fieldValidateRequire, dropdownSelectFieldValidateRequire } from './validate-require'
export { validateURI } from './validate-uri'
export { validatePassword, isValidPassword } from './validate-password'
export { isEmptyObject } from './validate-object'
export { isTextAndNumberOnly } from './validate-text-and-number'
export * from './regex'
