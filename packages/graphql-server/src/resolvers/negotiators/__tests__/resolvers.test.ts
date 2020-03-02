import { Negotiators } from '@reapit/foundations-ts-definitions'
import { queryNegotiators, queryNegotiatorById, createNegotiator, updateNegotiator } from '../resolvers'
import { GetNegotiatorByIdArgs } from '../negotiator'
import { mockContext } from '../../../__mocks__/context'
import { negotiatorStub } from '../__mocks__/negotiator'
import { negotiatorsStub } from '../__mocks__/negotiators'
import { createArgStub } from '../__mocks__/create-arg'
import { updateArgStub } from '../__mocks__/update-arg'

import errors from '../../../errors'

jest.mock('../services', () => ({
  getNegotiatorById: jest.fn(() => negotiatorStub),
  getNegotiators: jest.fn(() => negotiatorsStub),
  createNegotiator: jest.fn(() => true),
  updateNegotiator: jest.fn(() => negotiatorStub),
}))

describe('negotiator resolvers', () => {
  describe('queryNegotiatorById', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: 'MGL',
      } as GetNegotiatorByIdArgs
      const output = negotiatorStub
      const result = queryNegotiatorById({}, mockArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const mockArgs = {
        id: 'MGL',
      } as GetNegotiatorByIdArgs
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryNegotiatorById({}, mockArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('queryNegotiators', () => {
    it('should run correctly', () => {
      const mockArgs = {
        name: 'Abel Robertson',
      } as Negotiators
      const output = negotiatorsStub
      const result = queryNegotiators({}, mockArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const mockArgs = {
        name: 'Abel Robertson',
      } as Negotiators
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryNegotiators({}, mockArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('createNegotiator', () => {
    it('should run correctly', () => {
      const output = true
      const result = createNegotiator({}, createArgStub, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = updateNegotiator({}, updateArgStub, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('updateNegotiator', () => {
    it('should run correctly', () => {
      const output = negotiatorStub
      const result = updateNegotiator({}, updateArgStub, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = updateNegotiator({}, updateArgStub, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })
})
