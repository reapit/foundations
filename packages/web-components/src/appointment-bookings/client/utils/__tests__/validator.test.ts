import { validateEmail, validateRequiredField, validatePhoneNumber } from '../validator'

describe('validateEmail', () => {
  it('should return true if valid', () => {
    const result = validateEmail('test@mail.com')
    expect(result).toBe(true)
  })
  it('should return true if invalid', () => {
    const result = validateEmail('testmail.com')
    expect(result).toBe(false)
  })
})

describe('validateRequiredField', () => {
  it('should return true if valid', () => {
    const result = validateRequiredField('test')
    expect(result).toBe(true)
  })
  it('should return true if invalid', () => {
    const result = validateRequiredField('')
    expect(result).toBe(false)
  })
})

describe('validatePhoneNumber', () => {
  it('should return true if valid', () => {
    const result = validatePhoneNumber('0192312312')
    expect(result).toBe(true)
  })
  it('should return true if invalid', () => {
    const result = validatePhoneNumber('')
    expect(result).toBe(false)
  })
  it('should return true if invalid', () => {
    const result = validatePhoneNumber('awvwaz')
    expect(result).toBe(false)
  })
  it('should return true if invalid', () => {
    const result = validatePhoneNumber('0123912a121')
    expect(result).toBe(false)
  })
})
