import { isEmptyObject } from '../validate-object'

describe('isEmptyObject', () => {
  it('should return true', () => {
    expect(isEmptyObject({})).toBe(true)
    expect(isEmptyObject([])).toBe(true)
  })

  it('should return false', () => {
    expect(isEmptyObject({ a: 'a' })).toBe(false)
    expect(isEmptyObject(['1'])).toBe(false)
  })
})
