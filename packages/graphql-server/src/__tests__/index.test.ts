import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-core'
import { formatResponse, formatError, handleContext } from '../index'
import { GraphQLError } from 'graphql'

jest.mock('../logger')
jest.mock('uuid/v4', (): (() => string) => {
  return () => 'mockUUID'
})
jest.mock('apollo-server', () => {
  return {
    ApolloServer: function() {
      return {
        listen: jest.fn().mockResolvedValue({ url: 'serverUrl' }),
      }
    },
  }
})

const OLD_NODE_ENV = process.env.NODE_ENV

beforeAll(() => {
  jest.resetModules()
  process.env.NODE_ENV = 'production'
})

afterAll(() => {
  process.env.NODE_ENV = OLD_NODE_ENV
})

describe('app.js', () => {
  describe('formatResponse', () => {
    it('should run correctly', () => {
      const mockResponse = {
        data: { contact: {} },
        errors: undefined,
      } as GraphQLResponse
      const mockRequestContext = {
        context: {
          traceId: 'mockTraceId',
        },
        cache: {},
        request: {},
      } as GraphQLRequestContext<{ traceId?: string }>
      const result = formatResponse(mockResponse, mockRequestContext)
      expect(result).toEqual(mockResponse)
    })

    it('should return {}', () => {
      const mockResponse = null
      const mockRequestContext = {
        context: {
          traceId: 'mockTraceId',
        },
        cache: {},
        request: {},
      } as GraphQLRequestContext<{ traceId?: string }>
      const result = formatResponse(mockResponse, mockRequestContext)
      expect(result).toEqual({})
    })

    it('should return {}', () => {
      const mockResponse = null
      const mockRequestContext = {} as GraphQLRequestContext<{ traceId?: string }>
      const result = formatResponse(mockResponse, mockRequestContext)
      expect(result).toEqual({})
    })
  })

  describe('handleContext', () => {
    it('should run correctly', () => {
      const mockParams = {
        event: {
          headers: {
            Authorization: 'Mock Authorization',
          },
        },
        context: {
          functionName: 'Mock Function Name',
        },
      } as any
      const result = handleContext(mockParams)
      expect(result).toEqual({
        traceId: 'mockUUID',
        authorization: 'Mock Authorization',
        functionName: 'Mock Function Name',
        event: mockParams.event,
        context: mockParams.context,
      })
    })
  })

  describe('formatError', () => {
    it('should run correctly', () => {
      process.env.NODE_ENV = 'development'
      const mockError = {
        message: 'mock error',
        extensions: {
          code: {
            mockCode: 'mockCode',
          },
        },
        locations: undefined,
        path: undefined,
        nodes: undefined,
        source: undefined,
        positions: undefined,
        originalError: undefined,
        name: 'Error',
      } as GraphQLError
      const result = formatError(mockError)
      expect(result).toEqual(mockError)
    })

    it('should run correctly', () => {
      process.env.NODE_ENV = 'production'
      const mockError = {
        message: 'mock error',
        extensions: {
          code: {
            mockCode: 'mockCode',
          },
        },
        locations: undefined,
        path: undefined,
        nodes: undefined,
        source: undefined,
        positions: undefined,
        originalError: undefined,
        name: 'Error',
      } as GraphQLError
      const result = formatError(mockError)
      expect(result).toEqual({
        message: 'mock error',
        extensions: {
          code: { mockCode: 'mockCode' },
        },
      })
    })
  })
})
