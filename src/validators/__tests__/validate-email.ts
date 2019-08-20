import { isEmail, validateEmail } from '../validate-email'
import errorMessages from '../error-messages'

interface ValueTypes {
  validEmail: string
  invalidEmail: string
}

type ErrorKeys = 'validEmail' | 'invalidEmail'

describe('validate-email', () => {
  describe('Validate email function', () => {
    it('work correctly', () => {
      const values = {
        validEmail: 'test@mail.com',
        invalidEmail: 'test'
      }

      expect(
        validateEmail<ValueTypes, ErrorKeys>({
          values,
          currentErrors: {},
          keys: ['invalidEmail', 'validEmail']
        })
      ).toStrictEqual({
        invalidEmail: errorMessages.FIELD_WRONG_EMAIL_FORMAT
      })
    })

    it('should not override existed error key', () => {
      const values = {
        validEmail: 'test@mail.com',
        invalidEmail: 'test'
      }

      expect(
        validateEmail<ValueTypes, ErrorKeys>({
          values,
          currentErrors: { invalidEmail: 'test' },
          keys: ['invalidEmail', 'validEmail']
        })
      ).toStrictEqual({
        invalidEmail: 'test'
      })
    })
  })

  describe('isEmail', () => {
    it('should return true', () => {
      const input = 'tanphamhaiduong@gmail.com'
      const output = true
      const result = isEmail(input)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const input = 'tanphamhaiduong'
      const output = false
      const result = isEmail(input)
      expect(result).toEqual(output)
    })
  })

  describe('validateEmail', () => {
    it('should return errors', () => {
      const input = {
        values: 'mockValue',
        keys: ['mockKey'],
        length: 1,
        currentErrors: { mockKey: 'mockCurrentError' }
      }
      const output = {
        mockKey: 'mockCurrentError'
      }
      const result = validateEmail(input)
      expect(result).toEqual(output)
    })

    it('should return no errors', () => {
      const input = {
        values: 'mockValue',
        keys: [],
        length: 1,
        currentErrors: {}
      }
      const output = {}
      const result = validateEmail(input)
      expect(result).toEqual(output)
    })
  })
})
