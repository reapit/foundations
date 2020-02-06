import { initAuthorizedRequestHeaders } from '../api'

describe('initAuthorizedRequestHeaders', () => {
  it('should run correctly', async () => {
    const result = await initAuthorizedRequestHeaders()
    expect(result).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer null',
      'api-version': '2020-01-31',
    })
  })
})
