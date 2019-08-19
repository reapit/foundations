import {
  minLengthValidator,
  maxLengthValidator,
  validateMinCharacterLength,
  validateMaxCharacterLength
} from '../validate-character-length'

describe('validate-character-length', () => {
  describe('minLengthValidator', () => {
    it('should return true', () => {
      const mockLength = 5
      const mockString = '123213'
      const output = true
      const result = minLengthValidator(mockLength)(mockString)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const mockLength = 100
      const mockString = '123213'
      const output = false
      const result = minLengthValidator(mockLength)(mockString)
      expect(result).toEqual(output)
    })
  })

  describe('maxLengthValidator', () => {
    it('should return true', () => {
      const mockLength = 100
      const mockString = '123213'
      const output = true
      const result = maxLengthValidator(mockLength)(mockString)
      expect(result).toEqual(output)
    })

    it('should return false', () => {
      const mockLength = 5
      const mockString = '123213'
      const output = false
      const result = maxLengthValidator(mockLength)(mockString)
      expect(result).toEqual(output)
    })
  })

  describe('validateMinCharacterLength', () => {
    it('should return correct value when have input', () => {
      const input = {
        values: 'mockValue',
        keys: ['mockKey'],
        length: 1,
        currentErrors: { mockKey: 'mockCurrentError' }
      }
      const output = {
        mockKey: 'mockCurrentError'
      }
      const result = validateMinCharacterLength(input)
      expect(result).toEqual(output)
    })

    it('should return correct value when doesnt have error', () => {
      const input = {
        values: 'mockValue',
        keys: [],
        length: 1,
        currentErrors: {}
      }
      const output = {}
      const result = validateMinCharacterLength(input)
      expect(result).toEqual(output)
    })
  })

  describe('validateMaxCharacterLength', () => {
    it('should return correct value when have input', () => {
      const input = {
        values: 'mockValue',
        keys: ['mockKey'],
        length: 1,
        currentErrors: { mockKey: 'mockCurrentError' }
      }
      const output = {
        mockKey: 'mockCurrentError'
      }
      const result = validateMaxCharacterLength(input)
      expect(result).toEqual(output)
    })

    it('should return correct value when doesnt have error', () => {
      const input = {
        values: 'mockValue',
        keys: ['mockKey'],
        length: 1,
        currentErrors: { mockKey: 'mockCurrentError' }
      }
      const output = {
        mockKey: 'mockCurrentError'
      }
      const result = validateMaxCharacterLength(input)
      expect(result).toEqual(output)
    })
  })
})
