import { errorHandler } from '../error-handler'
import { Response } from 'express'
describe('error handler', () => {
  it('should correctly handle a server error', () => {
    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response
    const err = new Error('404 I am an error')

    errorHandler(err, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(JSON.stringify(err.message))
    expect(res.end).toHaveBeenCalledTimes(1)
  })
})
