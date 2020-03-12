import handleError, { HandleErrorParams } from '../handle-error'
import errors from '../../errors'

describe('handleError', () => {
  it('should return Authentication Error', () => {
    const input = {
      error: {
        response: {
          data: {},
          status: 401,
          headers: {},
        },
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateAuthenticationError('mockTraceId'))
  })

  it('should return Authentication Error', () => {
    const input = {
      error: {
        response: {
          data: {},
          status: 500,
          headers: {},
        },
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })
})
