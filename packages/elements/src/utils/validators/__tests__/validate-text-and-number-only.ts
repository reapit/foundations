import { isTextAndNumberOnly, isImageType } from '../validate-text-and-number'

interface ValueTypes {
  validEmail: string
  invalidEmail: string
}

describe('validate-number', () => {
  describe('isTextAndNumberOnly', () => {
    it('should return true', () => {
      const input = '980123111'
      const output = true
      const result = isTextAndNumberOnly(input)
      expect(result).toEqual(output)
    })

    it('should return true', () => {
      const input = '109310s12'
      const output = true
      const result = isTextAndNumberOnly(input)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const input = '////////////'
      const output = false
      const result = isTextAndNumberOnly(input)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const input = undefined
      const output = false
      const result = isTextAndNumberOnly(input)
      expect(result).toEqual(output)
    })
  })
})

describe('isImageType', () => {
  it('should return true', () => {
    const input = 'image/jpeg'
    const output = true
    const result = isImageType(input)
    expect(result).toEqual(output)
  })
})
