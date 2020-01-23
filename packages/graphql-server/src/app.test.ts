import { GraphQLResponse, GraphQLRequestContext } from 'apollo-server-core'
import { formatResponse, handleContext, ExpressContext, formatError, listenCallback } from './app'
import { GraphQLError } from 'graphql'
import { ServerInfo } from 'apollo-server'

jest.mock('uuid/v4', (): (() => string) => {
  return () => 'mockUUID'
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
      const mockPrams = {
        req: {
          headers: {
            authorization: 'mock Authorization',
          },
        },
        res: {},
      } as ExpressContext
      const result = handleContext(mockPrams)
      expect(result).toEqual({
        traceId: 'mockUUID',
        authorization: 'mock Authorization',
      })
    })
  })

  describe('formatError', () => {
    it('should run correctly', () => {
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

  describe('listenCallback', () => {
    it('should run correctly', () => {
      const mockServerInfo = {
        url: 'http://localhost:4000',
      } as ServerInfo
      const result = listenCallback(mockServerInfo)
      expect(result).not.toBeDefined()
    })
  })
})
