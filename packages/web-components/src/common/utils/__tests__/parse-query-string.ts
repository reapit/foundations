import { parseQueryString } from '../parse-query-string'

describe('parseQueryString', () => {
  it('should return correct value', () => {
    const params = parseQueryString('?id=123&searchType=sale&propertyImagesByPropertyId=someid')
    expect(params['id']).toEqual('123')
    expect(params['searchType']).toEqual('sale')
    expect(params['propertyImagesByPropertyId']).toEqual('someid')
  })
})
