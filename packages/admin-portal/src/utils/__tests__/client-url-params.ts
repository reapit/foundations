import { history } from '@/core/router'
import { addQuery, removeQuery, getParamsFromPath, stringifyObjectIntoQueryString } from '../client-url-params'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

describe('addQuery', () => {
  it('should return correct route path', () => {
    const query = { page: 1, search: 'google' }
    expect(addQuery(query)).toEqual('/?page=1&search=google')
  })
})

describe('removeQuery', () => {
  beforeAll(() => {
    history.push('/client/apps?search=hello')
  })
  it('should remove correct param', () => {
    const query = ['search']
    expect(removeQuery(query)).toEqual('/client/apps?')
  })
  it("do nothing if url doesn't contain param", () => {
    const query = ['otherParam']
    expect(removeQuery(query)).toEqual('/client/apps?search=hello')
  })
})

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
