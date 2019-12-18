import { Operation, IdGetterObj } from 'apollo-boost'
import { ErrorResponse } from 'apollo-link-error'
import { GraphQLError } from 'graphql'
import { request, onError, dataIdFromObject } from '../client'

describe('client', () => {
  describe('request', () => {
    it('should run correctly', done => {
      // @ts-ignore
      const mockOperation = {
        setContext: jest.fn(),
      } as Operation
      request(mockOperation)
      setTimeout(() => {
        expect(mockOperation.setContext).toBeCalled()
        done()
      }, 1000)
    })
  })
  describe('onError', () => {
    it('should run correctly when have both', () => {
      const mockError = {
        graphQLErrors: [new GraphQLError('123')] as ReadonlyArray<GraphQLError>,
        networkError: new Error('abc'),
      } as ErrorResponse
      onError(mockError)
    })

    it('should run correctly when no graphQLErrors', () => {
      const mockError = {
        graphQLErrors: [] as ReadonlyArray<GraphQLError>,
        networkError: new Error('abc'),
      } as ErrorResponse
      onError(mockError)
    })

    it('should run correctly when no networkError', () => {
      const mockError = {
        graphQLErrors: [new GraphQLError('123')] as ReadonlyArray<GraphQLError>,
        networkError: undefined,
      } as ErrorResponse
      onError(mockError)
    })

    it('should run correctly when no error', () => {
      const mockError = {
        graphQLErrors: [] as ReadonlyArray<GraphQLError>,
        networkError: undefined,
      } as ErrorResponse
      onError(mockError)
    })
  })

  describe('dataIdFromObject', () => {
    it('should run correctly', () => {
      const mockObject = {
        __typename: 'mockType',
        id: '1',
      } as IdGetterObj
      const result = dataIdFromObject(mockObject)
      const output = `${mockObject.__typename}:${mockObject.id}`
      expect(result).toEqual(output)
    })
  })
})
