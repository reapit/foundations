import { validateRequire, fieldValidateRequire, isEmpty, dropdownSelectFieldValidateRequire } from '../validate-require'
import errorMessages from '../error-messages'

interface ValueTypes {
  valid: string
  invalid: string
}

type ErrorKeys = 'valid' | 'invalid'

describe('validate-require', () => {
  describe('Validate require function', () => {
    it('work correctly', () => {
      const values = {
        valid: 'test@mail.com',
        invalid: '',
      }

      expect(
        validateRequire<ValueTypes, ErrorKeys>({
          values,
          currentErrors: {},
          keys: ['invalid', 'valid'],
        }),
      ).toStrictEqual({
        invalid: errorMessages.FIELD_REQUIRED,
      })
    })
  })

  describe('validateRequire', () => {
    it('should return errors', () => {
      const input = {
        values: 'mockValue',
        keys: ['mockKey'],
        length: 1,
        currentErrors: { mockKey: 'mockCurrentError' },
      }
      const output = {
        mockKey: 'mockCurrentError',
      }
      const result = validateRequire(input)
      expect(result).toEqual(output)
    })

    it('should return no errors', () => {
      const input = {
        values: 'mockValue',
        keys: [],
        length: 1,
        currentErrors: {},
      }
      const output = {}
      const result = validateRequire(input)
      expect(result).toEqual(output)
    })
  })
})

describe('fieldValidateRequire', () => {
  it('work correctly', () => {
    const value = ''
    expect(fieldValidateRequire(value)).toStrictEqual(errorMessages.FIELD_REQUIRED)
  })

  it('work correctly', () => {
    const value = '123'
    expect(fieldValidateRequire(value)).toBeNull()
  })
})

describe('validate empty', () => {
  it('work correctly', () => {
    expect(isEmpty('')).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty('a')).toBe(false)
  })

  it('work correctly', () => {
    expect(dropdownSelectFieldValidateRequire('')).toEqual(errorMessages.FIELD_REQUIRED)
    expect(dropdownSelectFieldValidateRequire([])).toEqual(errorMessages.FIELD_REQUIRED)
    expect(dropdownSelectFieldValidateRequire(['asd'])).toEqual('')
    expect(dropdownSelectFieldValidateRequire('asd')).toEqual('')
  })
})
