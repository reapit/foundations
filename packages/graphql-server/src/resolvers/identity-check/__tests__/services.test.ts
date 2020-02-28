import {
  createIdentityCheck,
  getIdentityCheckById,
  getIdentityChecks,
  updateIdentityCheck,
  GetIdentityCheckByIdModel,
  GetIdentityChecksModel,
  UpdateIdentityCheckExtend,
} from '../services'
import { CreateIdentityCheckModel } from '../../../types'
import { mockContext } from '../../../__mocks__/context'
import { identityCheck } from '../__mocks__/identity-check'
import { identityChecks } from '../__mocks__/identity-checks'

jest.mock('../api', () => ({
  callGetIdentityChecksAPI: jest.fn(() => identityChecks),
  callGetIdentityCheckByIdAPI: jest.fn(() => identityCheck),
  callCreateIdentityCheckAPI: jest.fn(() => true),
  callUpdateIdentityCheckAPI: jest.fn(() => identityCheck),
}))

describe('contact-identity-check services', () => {
  describe('getIdentityCheckById', () => {
    it('should run correctly', () => {
      const mockArgs = { id: '123' } as GetIdentityCheckByIdModel
      const output = identityCheck
      const result = getIdentityCheckById(mockArgs, mockContext)
      expect(result).toEqual(output)
    })
  })

  describe('getIdentityChecks', () => {
    it('should run correctly', () => {
      const mockArgs = {
        negotiatorId: 'string',
        contactId: 'string',
        pageNumber: 1,
        pageSize: 2,
        ids: ['1', '2'],
        status: 'unknow',
      } as GetIdentityChecksModel
      const output = identityChecks
      const result = getIdentityChecks(mockArgs, mockContext)
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
      const result = createIdentityCheck(mockArgs, mockContext)
      expect(result).toEqual(true)
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
      } as UpdateIdentityCheckExtend
      const result = updateIdentityCheck(mockArgs, mockContext)
      expect(result).toEqual(identityCheck)
    })
  })
})
