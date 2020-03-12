import handleError, { HandleErrorParams } from '../handle-error'
import errors from '../../errors'

describe('handleError', () => {
  it('should return ValidationError', () => {
    const input = {
      error: {
        response: {
          data: {},
          status: 400,
          headers: {},
        },
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateValidationError('mockTraceId'))
  })

  it('should return AuthenticationError', () => {
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

  it('should return ForbiddenError', () => {
    const input = {
      error: {
        response: {
          data: {},
          status: 403,
          headers: {},
        },
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateForbiddenError('mockTraceId'))
  })

  it('should return ApolloError', () => {
    const input = {
      error: {
        response: {
          data: {},
          status: 404,
          headers: {},
        },
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateNotFoundError('mockTraceId'))
  })

  it('should return UserInputError', () => {
    const input = {
      error: {
        response: {
          data: {},
          status: 412,
          headers: {},
        },
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateUserInputError('mockTraceId'))
  })

  it('should return UserInputError', () => {
    const input = {
      error: {
        response: {
          data: {},
          status: 422,
          headers: {},
        },
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateUserInputError('mockTraceId'))
  })

  it('should return ApolloError', () => {
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

  it('should return ApolloError', () => {
    const input = {
      error: undefined,
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })
  it('should return ApolloError', () => {
    const input = {
      error: {},
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })
  it('should return ApolloError', () => {
    const input = {
      error: {
        response: {},
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })
})
