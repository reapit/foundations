import { checkReapitReferenceFormat } from '../form-schema/validation-schema'

describe('checkReapitReferenceFormat', () => {
  it('should run correctly', () => {
    expect(checkReapitReferenceFormat('abc123')).toBeTruthy()
    expect(checkReapitReferenceFormat('')).toBeFalsy()
    expect(checkReapitReferenceFormat('123456')).toBeFalsy()
    expect(checkReapitReferenceFormat('abcdef')).toBeFalsy()
  })
})
