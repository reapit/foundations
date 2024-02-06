import { tryGetFirstName } from '../utils'

describe('tryGetFirstName', () => {
  it('should return the input if the input length is less than 2', () => {
    expect(tryGetFirstName('A')).toBe('A')
  })

  it('should return the first part of the name if the name has less than 3 parts', () => {
    expect(tryGetFirstName('John Doe')).toBe('John')
  })

  it('should return the second part of the name if the first part is a title', () => {
    expect(tryGetFirstName('Mr John Doe')).toBe('John')
  })

  it('should return the first part of the name if the first part is not a title', () => {
    expect(tryGetFirstName('John Mr Doe')).toBe('John')
  })
})
