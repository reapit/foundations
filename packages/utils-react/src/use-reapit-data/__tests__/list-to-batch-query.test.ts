import { listToBatchQuery, objectToQuery, stringListToBatchQuery } from '../list-to-batch-query'

describe('listToBatchQuery', () => {
  it('should return a query in the correct format for useReapitGet', () => {
    const list = [{ id: 'MOCK_ID1' }, { id: 'MOCK_ID2' }, { id: 'MOCK_ID3' }]
    const result = listToBatchQuery(list, 'id', 'appId')

    expect(result).toEqual('MOCK_ID1&appId=MOCK_ID2&appId=MOCK_ID3')
  })
})

describe('stringListToBatchQuery', () => {
  it('should return a query in the correct format for useReapitGet', () => {
    const list = ['MOCK_ID1', 'MOCK_ID2', 3]
    const result = stringListToBatchQuery(list, 'appId')

    expect(result).toEqual('MOCK_ID1&appId=MOCK_ID2&appId=3')
  })
})

describe('objectToQuery', () => {
  it('should return a query in the correct format for useReapitGet', () => {
    const object = {
      appId: ['MOCK_ID1', 'MOCK_ID2'],
      someOtherKey: 'FOO',
      aNumericKey: 2,
    }
    const result = objectToQuery(object)

    expect(result).toEqual({ appId: 'MOCK_ID1&appId=MOCK_ID2', someOtherKey: 'FOO', aNumericKey: '2' })
  })
})
