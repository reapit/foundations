import {
  callGetIdentityCheckByIdAPI,
  callGetIdentityChecksAPI,
  callCreateIdentityCheckAPI,
  callUpdateIdentityCheckAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateIdentityCheckArgs } from '../__stubs__/mock-create-identity-check'
import { mockUpdateIdentityCheckArgs } from '../__stubs__/mock-update-identity-check'
import { getIdentityCheckById, getIdentityChecks, createIdentityCheck, updateIdentityCheck } from '../services'
import { mockIdentityCheck } from '../__stubs__/mock-identity-check'
import { mockIdentityChecks } from '../__stubs__/mock-identity-checks'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetIdentityCheckByIdAPI: jest.fn(() => Promise.resolve(mockIdentityCheck)),
  callGetIdentityChecksAPI: jest.fn(() => Promise.resolve(mockIdentityChecks)),
  callCreateIdentityCheckAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateIdentityCheckAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getIdentityCheckById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getIdentityCheckById(args, mockContext)
    expect(callGetIdentityCheckByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockIdentityCheck)
  })
})

describe('getIdentityChecks', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getIdentityChecks(args, mockContext)
    expect(callGetIdentityChecksAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockIdentityChecks)
  })
})

describe('createIdentityCheck', () => {
  it('should return correctly', async () => {
    const result = await createIdentityCheck(mockCreateIdentityCheckArgs, mockContext)
    expect(callCreateIdentityCheckAPI).toHaveBeenCalledWith(mockCreateIdentityCheckArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateIdentityCheck', () => {
  it('should return correctly', async () => {
    const result = await updateIdentityCheck(mockUpdateIdentityCheckArgs, mockContext)
    expect(callUpdateIdentityCheckAPI).toHaveBeenCalledWith(mockUpdateIdentityCheckArgs, mockContext)
    expect(result).toEqual(true)
  })
})
