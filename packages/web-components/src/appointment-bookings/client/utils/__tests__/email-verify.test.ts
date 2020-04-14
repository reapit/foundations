import { validateEmail } from '../email-verify'

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
