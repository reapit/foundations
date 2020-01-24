import { isValidPassword, validatePassword } from '../validate-password'
import errorMessages from '../error-messages'

interface ValueTypes {
  validPassword: string
  invalidPassword: string
}

type ErrorKeys = 'validPassword' | 'invalidPassword'

describe('validate-password', () => {
  describe('Validate password function', () => {
    it('work correctly', () => {
      const values = {
        validPassword: 'Password1',
        invalidPassword: 'Passwor',
      }

      expect(
        validatePassword<ValueTypes, ErrorKeys>({
          values,
          currentErrors: {},
          keys: ['validPassword', 'invalidPassword'],
        }),
      ).toStrictEqual({
        invalidPassword: errorMessages.FIELD_INVALID_PASSWORD,
      })
    })

    it('should not override existed error key', () => {
      const values = {
        validPassword: 'Password1',
        invalidPassword: 'Passwor',
      }

      expect(
        validatePassword<ValueTypes, ErrorKeys>({
          values,
          currentErrors: { invalidPassword: 'Passwor' },
          keys: ['validPassword', 'invalidPassword'],
        }),
      ).toStrictEqual({
        invalidPassword: 'Passwor',
      })
    })
  })

  describe('isValidPassword', () => {
    it('should return true', () => {
      const input = 'Password1'
      const output = true
      const result = isValidPassword(input)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const input = 'password'
      const output = false
      const result = isValidPassword(input)
      expect(result).toEqual(output)
    })
  })

  describe('validatePassword', () => {
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
      const result = validatePassword(input)
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
      const result = validatePassword(input)
      expect(result).toEqual(output)
    })
  })
})
