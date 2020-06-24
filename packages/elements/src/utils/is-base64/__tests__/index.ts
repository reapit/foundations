import { isBase64 } from '../.'

describe('isBase64', () => {
  it('should return false', () => {
    const input = 'http://test.com'
    const result = isBase64(input)
    expect(result).toEqual(false)
  })

  it('should return false', () => {
    const input = 'https://test.com'
    const result = isBase64(input)
    expect(result).toEqual(false)
  })

  it('should return false', () => {
    const input = 'http://'
    const result = isBase64(input)
    expect(result).toEqual(false)
  })

  it('should return false', () => {
    const input = undefined
    const result = isBase64(input)
    expect(result).toEqual(false)
  })

  it('should return false', () => {
    const input = null
    const result = isBase64(input)
    expect(result).toEqual(false)
  })
})
