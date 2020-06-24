import { isBase64, getTypeFromBase64 } from '../.'

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

describe('getTypeFromBase64', () => {
  it('should return correctly', () => {
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'

    const result = getTypeFromBase64(base64)
    expect(result).toEqual('image/png')
  })
})
