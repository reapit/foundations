import { stringifyObjectIntoQueryString, getParamsFromPath } from '@/utils/client-url-params'

describe('stringifyObjectIntoQueryString', () => {
  it('should run correctly', () => {
    const params = {
      name: 'test',
      request: 5,
    }
    expect(stringifyObjectIntoQueryString(params)).toEqual('name=test&request=5')
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
