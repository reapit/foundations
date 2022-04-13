import { getParamsFromPath, setQueryParams } from '../index'

describe('setQueryParams', () => {
  it('should create query params', () => {
    const variants = [
      [{ name: '1', address: '1' }, 'name=1&address=1'],
      [{ name: '', address: '1' }, 'address=1'],
      [{ name: ['a', 'b'], address: '1' }, 'name=a&name=b&address=1'],
      [{ name: null, address: undefined }, ''],
    ]
    variants.forEach(([params, expected]) => {
      const result = setQueryParams(params)
      expect(result).toBe(expected)
    })
  })
})

describe('getParamsFromPath', () => {
  it('should run correctly', () => {
    const search = 'page=1&search=google&category=1'
    expect(getParamsFromPath(search)).toEqual({
      page: 1,
      search: 'google',
      category: '1',
    })
  })
})
