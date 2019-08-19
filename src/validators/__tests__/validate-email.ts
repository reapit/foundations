import { isEmail, validateEmail } from '../validate-email'

describe('validate-email', () => {
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
