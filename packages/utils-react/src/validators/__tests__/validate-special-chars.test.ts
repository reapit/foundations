import errorMessages from '../error-messages'
import { validateSpecialChars } from '../validate-special-chars'

describe('hasSpecialChars', () => {
  it('should return null if the string is empty', () => {
    const mockValidate = jest.fn()
    const curried = validateSpecialChars(false, mockValidate)
    expect(curried('')).toBe(null)
  })

  it('it should return null for a string with safe characters', () => {
    const mockValidate = jest.fn()
    const curried = validateSpecialChars(false, mockValidate)
    expect(curried('1aA !@£$%^&*()_-+=\'";:~#.,')).toBe(null)
  })

  it('it should return an error message where a string has special characters', () => {
    const mockValidate = jest.fn()
    const curried = validateSpecialChars(false, mockValidate)
    ;['{', '}', '|', '[', ']', '<', '>', '±', '§'].forEach((testString) =>
      expect(curried(testString)).toBe(errorMessages.SPECIAL_CHARS),
    )
  })

  it('it should return an error message where a string has javascript keyword', () => {
    const mockValidate = jest.fn()
    const curried = validateSpecialChars(false, mockValidate)
    ;['javascript', 'JAVASCRIPT'].forEach((testString) => expect(curried(testString)).toBe(errorMessages.SPECIAL_CHARS))
  })

  it('it should return a validator error message if validate is true', () => {
    const mockValidate = jest.fn(() => 'SOME_MESSAGE')
    const curried = validateSpecialChars(true, mockValidate)
    expect(curried('1aA !@£$%^&*()_-+=\'";:~#.,')).toBe('SOME_MESSAGE')
  })
})
