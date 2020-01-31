import { initAuthorizedRequestHeaders } from '../api'
import { API_VERSION } from '../../constants/api'

describe('initAuthorizedRequestHeaders', () => {
  it('should run correctly', async () => {
    const result = await initAuthorizedRequestHeaders()
    expect(result).toEqual({
      'Content-Type': 'application/json',
      Authorization: 'Bearer null',
      'api-version': API_VERSION,
    })
  })
})
