import { listToBatchQuery } from '../list-to-batch-query'

describe('listToBatchQuery', () => {
  it('should return a query in the correct format for useReapitGet', () => {
    const list = [{ id: 'MOCK_ID1' }, { id: 'MOCK_ID2' }, { id: 'MOCK_ID3' }]
    const result = listToBatchQuery(list, 'id', 'appId')

    expect(result).toEqual('MOCK_ID1&appId=MOCK_ID2&appId=MOCK_ID3')
  })
})
