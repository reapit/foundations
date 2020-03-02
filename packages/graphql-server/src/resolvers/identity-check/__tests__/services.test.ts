import { createIdentityCheck, getIdentityCheckById, getIdentityChecks, updateIdentityCheck } from '../services'
import {
  GetIdentityChecksArgs,
  GetIdentityCheckByIdArgs,
  UpdateIdentityCheckArgs,
  CreateIdentityCheckArgs,
} from '../identity-check'
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
      const mockArgs = { id: '123' } as GetIdentityCheckByIdArgs
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
      } as GetIdentityChecksArgs
      const output = identityChecks
      const result = getIdentityChecks(mockArgs, mockContext)
      expect(result).toEqual(output)
    })
  })

  describe('createIdentityCheck', () => {
    it('should run correctly', () => {
      const mockArgs = {
        model: {
          contactId: 'string',
          checkDate: 'string',
          status: 'string',
          negotiatorId: 'string',
          identityDocument1: {},
          identityDocument2: {},
          metadata: {},
        },
      } as CreateIdentityCheckArgs
      const result = createIdentityCheck(mockArgs, mockContext)
      expect(result).toEqual(true)
    })
  })

  describe('updateIdentityCheck', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: 'string',
        model: {
          checkDate: 'string',
          status: 'string',
          negotiatorId: 'string',
          identityDocument1: {},
          identityDocument2: {},
          metadata: {},
        },
      } as UpdateIdentityCheckArgs
      const result = updateIdentityCheck(mockArgs, mockContext)
      expect(result).toEqual(identityCheck)
    })
  })
})
