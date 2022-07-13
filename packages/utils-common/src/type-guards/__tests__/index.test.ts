import { isTruthy } from '..'

describe('isTruthy', () => {
  it('should return false for a null', () => {
    expect(isTruthy(null)).toBe(false)
  })

  it('should return false for an undefined', () => {
    expect(isTruthy(undefined)).toBe(false)
  })

  it('should return false for zero', () => {
    expect(isTruthy(0)).toBe(false)
  })

  it('should return false for an empty string', () => {
    expect(isTruthy(null)).toBe(false)
  })

  it('should return true for any other object', () => {
    expect(isTruthy({})).toBe(true)
  })
})
