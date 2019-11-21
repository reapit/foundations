import errorHandler from '../error-handler'
import { mockRes } from '../../__mocks__/express'

describe('error handler', () => {
  it('should handle an error correctly', () => {
    const status = 400
    const message = 'Some error'
    const error = new Error('Some error')
    errorHandler(mockRes, status, `${message} ${error.message}`)

    expect(mockRes.status).toHaveBeenCalledTimes(1)
    expect(mockRes.status).toHaveBeenCalledWith(status)

    expect(mockRes.json).toHaveBeenCalledTimes(1)
    expect(mockRes.json).toHaveBeenCalledWith({
      error: {
        status,
        message: `${message} ${error.message}`
      }
    })
    expect(mockRes.end).toHaveBeenCalledTimes(1)
  })
})
