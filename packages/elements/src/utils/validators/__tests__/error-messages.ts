import { minCharLengthErrMessage, maxCharLengthErrMessage } from '../error-messages'

describe('error-message', () => {
  describe('minCharLengthErrMessage', () => {
    it('should return correct when have input', () => {
      const input = 1
      const output = 'The minimum length is 1 characters'
      const result = minCharLengthErrMessage(input)
      expect(result).toEqual(output)
    })
    it('should return correct when dont have input', () => {
      const input = undefined
      const output = 'The minimum length is 0 characters'
      const result = minCharLengthErrMessage(input)
      expect(result).toEqual(output)
    })
  })
  describe('maxCharLengthErrMessage', () => {
    it('should return correct when have input', () => {
      const input = 1
      const output = 'The maximum length is 1 characters'
      const result = maxCharLengthErrMessage(input)
      expect(result).toEqual(output)
    })
    it('should return correct when dont have input', () => {
      const input = undefined
      const output = 'The maximum length is 0 characters'
      const result = maxCharLengthErrMessage(input)
      expect(result).toEqual(output)
    })
  })
})
