import { errorHandler } from '../error-handler'
import { AppRequest, AppResponse } from '../../../../../utils/src/node/logger'
describe('error handler', () => {
  it('should correctly handle a server error', () => {
    const res = ({
      status: jest.fn(),
      json: jest.fn(),
      end: jest.fn(),
    } as unknown) as AppResponse
    const err = new Error('404 I am an error')
    const logger = { error: jest.fn }
    const req = ({ headers: 'test' } as unknown) as AppRequest
    const caller = 'test'

    errorHandler(err, res, req, caller, logger)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith(JSON.stringify(err.message))
    expect(res.end).toHaveBeenCalledTimes(1)
  })
})
