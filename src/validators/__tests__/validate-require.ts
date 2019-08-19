import { validateRequire } from '../validate-require'

describe('validate-require', () => {
  describe('validateRequire', () => {
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
      const result = validateRequire(input)
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
      const result = validateRequire(input)
      expect(result).toEqual(output)
    })
  })
})
