import successHandler from '../success-handler'
import { mockRes, mockReq } from '../../__mocks__/express'

describe('success handler', () => {
  it('should handle a successful request correctly', () => {
    const status = 200
    successHandler(mockRes, status, mockReq.url, {})

    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(status)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({})

    expect(mockRes.end).toHaveBeenCalledTimes(1)
  })
})
