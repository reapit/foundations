import {
  validateBase,
  minLengthValidator,
  maxLengthValidator,
  validateMinCharacterLength,
  validateMaxCharacterLength,
  validateEmail,
  isEmail,
  validateRequire,
  validateURI,
} from '../index'

describe('validators', () => {
  it('validateBase', () => {
    expect(validateBase).toBeDefined()
  })
  it('minLengthValidator', () => {
    expect(minLengthValidator).toBeDefined()
  })
  it('maxLengthValidator', () => {
    expect(maxLengthValidator).toBeDefined()
  })
  it('validateMinCharacterLength', () => {
    expect(validateMinCharacterLength).toBeDefined()
  })
  it('validateMaxCharacterLength', () => {
    expect(validateMaxCharacterLength).toBeDefined()
  })
  it('validateEmail', () => {
    expect(validateEmail).toBeDefined()
  })
  it('isEmail', () => {
    expect(isEmail).toBeDefined()
  })
  it('validateRequire', () => {
    expect(validateRequire).toBeDefined()
  })
  it('validateURI', () => {
    expect(validateURI).toBeDefined()
  })
})
