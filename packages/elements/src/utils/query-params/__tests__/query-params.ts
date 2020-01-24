import { setQueryParams } from '../query-params'

describe('setQueryParams', () => {
  it('should create query params', () => {
    ;[
      [{ name: '1', address: '1' }, 'name=1&address=1'],
      [{ name: '', address: '1' }, 'address=1'],
      [{ name: ['a', 'b'], address: '1' }, 'name=a&name=b&address=1'],
      [{ name: null, address: undefined }, ''],
    ].forEach(([params, expected]) => {
      const result = setQueryParams(params)
      expect(result).toBe(expected)
    })
  })
})
