import { isNumberOnly } from '../validate-number'

interface ValueTypes {
  validEmail: string
  invalidEmail: string
}

describe('validate-number', () => {
  describe('isNumber', () => {
    it('should return true', () => {
      const input = '980123111'
      const output = true
      const result = isNumberOnly(input)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const input = '109310s12'
      const output = false
      const result = isNumberOnly(input)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const input = null
      const output = false
      const result = isNumberOnly(input)
      expect(result).toEqual(output)
    })
  })
})
