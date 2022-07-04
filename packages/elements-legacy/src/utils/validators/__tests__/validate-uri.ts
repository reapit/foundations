import { validateURI, uriValidator } from '../validate-uri'
import errorMessages from '../error-messages'

interface ValueTypes {
  validURI: string
  invalidURI: string
}

type ErrorKeys = 'validURI' | 'invalidURI'

describe('validate-require', () => {
  describe('Validate uri function', () => {
    it('work correctly', () => {
      const values = {
        validURI: 'https://website.com',
        invalidURI: 'invalid.net',
      }

      expect(
        validateURI<ValueTypes, ErrorKeys>({
          values,
          currentErrors: {},
          keys: ['invalidURI', 'validURI'],
        }),
      ).toStrictEqual({
        invalidURI: errorMessages.FIELD_WRONG_URI_FORMAT,
      })
    })
  })

  describe('uriValidator', () => {
    it('should return true', () => {
      const input = 'https://google.com'
      const output = true
      const result = uriValidator(input)
      expect(result).toEqual(output)
    })
    it('should return false', () => {
      const input = 'https://google'
      const output = false
      const result = uriValidator(input)
      expect(result).toEqual(output)
    })
  })
  describe('validateURI', () => {
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
      const result = validateURI(input)
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
      const result = validateURI(input)
      expect(result).toEqual(output)
    })
  })
})
