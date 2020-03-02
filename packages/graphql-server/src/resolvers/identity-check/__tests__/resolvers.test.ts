import { createIdentityCheck, queryIdentityChecks, queryIdentityCheckById, updateIdentityCheck } from '../resolvers'
import { mockContext } from '../../../__mocks__/context'
import { CreateIdentityCheckModel } from '../../../types'
import { GetIdentityCheckByIdModel, GetIdentityChecksModel, UpdateIdentityCheckExtend } from '../services'
import errors from '../../../errors'
import { identityCheck } from '../__mocks__/identity-check'
import { identityChecks } from '../__mocks__/identity-checks'

jest.mock('../services', () => ({
  getIdentityChecks: jest.fn(() => identityChecks),
  getIdentityCheckById: jest.fn(() => identityCheck),
  createIdentityCheck: jest.fn(() => true),
  updateIdentityCheck: jest.fn(() => identityCheck),
}))

describe('contact-identity-check resolvers', () => {
  describe('queryIdentityChecks', () => {
    it('should run correctly', () => {
      const mockArgs = {
        negotiatorId: 'string',
        contactId: 'string',
        pageNumber: 1,
        pageSize: 2,
        ids: ['1', '2'],
        status: 'unknow',
      } as GetIdentityChecksModel
      const result = queryIdentityChecks({}, mockArgs, mockContext)
      expect(result).toEqual(identityChecks)
    })

    it('should run correctly', () => {
      const mockArgs = {
        negotiatorId: 'string',
        contactId: 'string',
        pageNumber: 1,
        pageSize: 2,
        ids: ['1', '2'],
        status: 'unknow',
      } as GetIdentityChecksModel
      const result = queryIdentityChecks({}, mockArgs, { ...mockContext, authorization: '' })
      const output = errors.generateAuthenticationError(mockContext.traceId)
      expect(result).toEqual(output)
    })
  })

  describe('queryIdentityCheckById', () => {
    it('should run correctly', () => {
      const mockArgs = { id: '123' } as GetIdentityCheckByIdModel
      const result = queryIdentityCheckById({}, mockArgs, mockContext)
      expect(result).toEqual(identityCheck)
    })

    it('should run correctly', () => {
      const mockArgs = { id: '123' } as GetIdentityCheckByIdModel
      const result = queryIdentityCheckById({}, mockArgs, { ...mockContext, authorization: '' })
      const output = errors.generateAuthenticationError(mockContext.traceId)
      expect(result).toEqual(output)
    })
  })

  describe('queryIdentityCheckById', () => {
    it('should run correctly', () => {
      const mockArgs = { id: '123' } as GetIdentityCheckByIdModel
      const result = queryIdentityCheckById({}, mockArgs, mockContext)
      expect(result).toEqual(identityCheck)
    })

    it('should run correctly', () => {
      const mockArgs = { id: '123' } as GetIdentityCheckByIdModel
      const result = queryIdentityCheckById({}, mockArgs, { ...mockContext, authorization: '' })
      const output = errors.generateAuthenticationError(mockContext.traceId)
      expect(result).toEqual(output)
    })
  })

  describe('createIdentityCheck', () => {
    it('should run correctly', () => {
      const mockArgs = {
        contactId: 'string',
        checkDate: 'string',
        status: 'string',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
      } as CreateIdentityCheckModel
      const result = createIdentityCheck({}, mockArgs, mockContext)
      expect(result).toEqual(true)
    })

    it('should run correctly', () => {
      const mockArgs = {
        contactId: 'string',
        checkDate: 'string',
        status: 'string',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
      } as CreateIdentityCheckModel
      const result = createIdentityCheck({}, mockArgs, { ...mockContext, authorization: '' })
      const output = errors.generateAuthenticationError(mockContext.traceId)
      expect(result).toEqual(output)
    })
  })

  describe('updateIdentityCheck', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: 'string',
        checkDate: 'string',
        status: 'string',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
        _eTag: '123',
      } as UpdateIdentityCheckExtend
      const result = updateIdentityCheck({}, mockArgs, mockContext)
      expect(result).toEqual(identityCheck)
    })

    it('should run correctly', () => {
      const mockArgs = {
        id: 'string',
        checkDate: 'string',
        status: 'string',
        negotiatorId: 'string',
        identityDocument1: {},
        identityDocument2: {},
        metadata: {},
        _eTag: '123',
      } as UpdateIdentityCheckExtend
      const result = updateIdentityCheck({}, mockArgs, { ...mockContext, authorization: '' })
      const output = errors.generateAuthenticationError(mockContext.traceId)
      expect(result).toEqual(output)
    })
  })
})
