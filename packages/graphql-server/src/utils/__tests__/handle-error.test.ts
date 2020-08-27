import handleError, { HandleErrorParams, handleGraphQlError, HandleGraphQlError } from '../handle-error'
import errors from '../../errors'
import logger from '../../logger'

jest.mock('../../logger/')
xdescribe('handleError', () => {
  it('should return ValidationError', async () => {
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
    const output = await handleError(input)
    expect(output).toEqual(errors.generateValidationError('mockTraceId'))
  })

  it('should return AuthenticationError', async () => {
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
    const output = await handleError(input)
    expect(output).toEqual(errors.generateAuthenticationError('mockTraceId'))
  })

  it('should return ForbiddenError', async () => {
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
    const output = await handleError(input)
    expect(output).toEqual(errors.generateForbiddenError('mockTraceId'))
  })

  it('should return ApolloError', async () => {
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
    const output = await handleError(input)
    expect(output).toEqual(errors.generateNotFoundError('mockTraceId'))
  })

  it('should return UserInputError', async () => {
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
    const output = await handleError(input)
    expect(output).toEqual(errors.generateUserInputError('mockTraceId'))
  })

  it('should return UserInputError', async () => {
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
    const output = await handleError(input)
    expect(output).toEqual(errors.generateUserInputError('mockTraceId'))
  })

  it('should return ApolloError', async () => {
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
    const output = await handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })

  it('should return ApolloError', async () => {
    const input = ({
      error: undefined,
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as unknown) as HandleErrorParams
    const output = await handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })
  it('should return ApolloError', async () => {
    const input = {
      error: {},
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = await handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })
  it('should return ApolloError', async () => {
    const input = {
      error: {
        response: {},
      },
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleErrorParams
    const output = await handleError(input)
    expect(output).toEqual(errors.generateInternalServerError('mockTraceId'))
  })
})

describe('handleGraphQlError', () => {
  it('should run correctly', async () => {
    const input = {
      error: 'Error',
      caller: 'mockCaller',
      traceId: 'mockTraceId',
    } as HandleGraphQlError
    await handleGraphQlError(input)
    expect(logger.error).toBeCalled()
  })
})
