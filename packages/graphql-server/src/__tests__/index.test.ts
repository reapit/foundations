import { formatError, handleContext } from '../utils'
import { GraphQLError } from 'graphql'

jest.mock('../logger')
jest.mock('uuid/v4', (): (() => string) => {
  return () => 'mockUUID'
})
jest.mock('apollo-server-lambda', () => {
  return {
    ApolloServer: function () {
      return {
        createHandler: jest.fn(),
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

describe('index.js', () => {
  describe('handleContext', () => {
    it('should run correctly', () => {
      const mockParams = {
        event: {
          headers: {
            'reapit-connect-token': 'Mock Authorization',
          },
        },
        context: {
          functionName: 'Mock Function Name',
        },
      } as any
      const result = handleContext(mockParams)
      expect(result).toEqual({
        traceId: 'UNKNOWN-CUSTOMER-mockUUID',
        authorization: 'Mock Authorization',
        functionName: 'Mock Function Name',
        headers: {
          'reapit-connect-token': 'Mock Authorization',
        },
        event: mockParams.event,
        context: mockParams.context,
        dataLoader: expect.any(Object),
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
