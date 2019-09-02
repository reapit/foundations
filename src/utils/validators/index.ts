export type PartialRecord<K extends keyof any, T> = { [P in K]?: T }

export { validateBase } from './validate-base'
export {
  minLengthValidator,
  maxLengthValidator,
  validateMinCharacterLength,
  validateMaxCharacterLength
} from './validate-character-length'
export { validateEmail, isEmail } from './validate-email'
export { validateRequire } from './validate-require'
export { validateURI } from './validate-uri'
