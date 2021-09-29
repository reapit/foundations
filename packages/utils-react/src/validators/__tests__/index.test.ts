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
  test('validateBase', () => {
    expect(validateBase).toBeDefined()
  })

  test('minLengthValidator', () => {
    expect(minLengthValidator).toBeDefined()
  })

  test('maxLengthValidator', () => {
    expect(maxLengthValidator).toBeDefined()
  })

  test('validateMinCharacterLength', () => {
    expect(validateMinCharacterLength).toBeDefined()
  })

  test('validateMaxCharacterLength', () => {
    expect(validateMaxCharacterLength).toBeDefined()
  })

  test('validateEmail', () => {
    expect(validateEmail).toBeDefined()
  })

  test('isEmail', () => {
    expect(isEmail).toBeDefined()
  })

  test('validateRequire', () => {
    expect(validateRequire).toBeDefined()
  })

  test('validateURI', () => {
    expect(validateURI).toBeDefined()
  })
})
