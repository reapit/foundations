import { isNumber } from '../validators'

describe('isNumber', () => {
  it('should run correctly', () => {
    expect(isNumber('12345')).toBe(true)
    expect(isNumber('12345a')).toBe(false)
  })
})
