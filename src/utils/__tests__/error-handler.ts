import { Response } from 'express'
import errorHandler from '../error-handler'

describe('error handler', () => {
  it('should handle an error correctly', () => {
    const stubRes: Partial<Response> = {
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn()
    }
    const status = 400
    const message = 'Some error'
    const error = new Error('Some error')
    errorHandler(stubRes as Response, status, message, error)

    expect(stubRes.status).toHaveBeenCalledTimes(1)
    expect(stubRes.status).toHaveBeenCalledWith(status)

    expect(stubRes.json).toHaveBeenCalledTimes(1)
    expect(stubRes.json).toHaveBeenCalledWith({
      error: {
        status,
        message
      }
    })
    expect(stubRes.end).toHaveBeenCalledTimes(1)
  })
})
