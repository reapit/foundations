import { isImageType } from '../string'

describe('isImageType', () => {
  it('should return true', () => {
    const input = 'image/jpeg'
    const output = true
    const result = isImageType(input)
    expect(result).toEqual(output)
  })
})
