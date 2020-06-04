import { isEmptyString } from '../validate-string'

describe('validate empty', () => {
  it('work correctly', () => {
    expect(isEmptyString('')).toBe(true)
    expect(isEmptyString([])).toBe(true)
    expect(isEmptyString('a')).toBe(false)
  })
})
