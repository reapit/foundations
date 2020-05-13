import errorMessages from '../error-messages'

describe('error-messages', () => {
  describe('MINIMUM_CHARACTER_LENGTH', () => {
    it('should run correctly', () => {
      const result = errorMessages.MINIMUM_CHARACTER_LENGTH(1)
      expect(result).toEqual(`The minimum length is ${1} characters`)
    })
  })

  describe('MAXIMUM_CHARACTER_LENGTH', () => {
    it('should run correctly', () => {
      const result = errorMessages.MAXIMUM_CHARACTER_LENGTH(1)
      expect(result).toEqual(`The maximum length is ${1} characters`)
    })
  })
})
