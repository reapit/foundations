import { initAuthorizedRequestHeaders } from '../api'

describe('initAuthorizedRequestHeaders', () => {
  it('should return correctly', () => {
    const result = initAuthorizedRequestHeaders()
    expect(result).toBeDefined()
  })
})
