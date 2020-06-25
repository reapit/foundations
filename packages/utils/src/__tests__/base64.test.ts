import { getTypeFromBase64 } from '@/base64'

describe('getTypeFromBase64', () => {
  it('should return correctly', () => {
    const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'

    const result = getTypeFromBase64(base64)
    expect(result).toEqual('image/png')
  })
})
