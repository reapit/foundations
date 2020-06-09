import { cleanObject } from '../object'

describe('cleanObject', () => {
  it('should run correctly', () => {
    expect(cleanObject({})).toEqual({})
    expect(cleanObject({ a: undefined })).toEqual({})
    expect(cleanObject({ a: undefined, b: 'a' })).toEqual({ b: 'a' })
    expect(cleanObject({ a: null, b: 'a' })).toEqual({ b: 'a' })
  })
})
