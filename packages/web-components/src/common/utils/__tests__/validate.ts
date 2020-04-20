import { validateEmail } from '../validate'

describe('validate email', () => {
  it('should return true', () => {
    const mail = 'abc@edf.com'
    expect(validateEmail(mail)).toBe(true)
  })

  it('should return false', () => {
    let mail = 'abcedf.com'
    expect(validateEmail(mail)).toBe(false)

    mail = 'abc@edf.c'
    expect(validateEmail(mail)).toBe(false)

    mail = 'abc@edf'
    expect(validateEmail(mail)).toBe(false)
  })
})
