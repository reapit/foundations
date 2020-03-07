import {
  callGetIdentityCheckByIdAPI,
  callGetIdentityChecksAPI,
  callCreateIdentityCheckAPI,
  callUpdateIdentityCheckAPI,
} from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createIdentityCheckArgsMock } from '../__mocks__/create-identity-check'
import { updateIdentityCheckArgsMock } from '../__mocks__/update-identity-check'
import { getIdentityCheckById, getIdentityChecks, createIdentityCheck, updateIdentityCheck } from '../services'
import { identityCheckMock } from '../__mocks__/identity-check'
import { identityChecksMock } from '../__mocks__/identity-checks'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetIdentityCheckByIdAPI: jest.fn(() => Promise.resolve(identityCheckMock)),
  callGetIdentityChecksAPI: jest.fn(() => Promise.resolve(identityChecksMock)),
  callCreateIdentityCheckAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateIdentityCheckAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getIdentityCheckById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getIdentityCheckById(args, mockContext)
    expect(callGetIdentityCheckByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(identityCheckMock)
  })
})

describe('getIdentityChecks', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getIdentityChecks(args, mockContext)
    expect(callGetIdentityChecksAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(identityChecksMock)
  })
})

describe('createIdentityCheck', () => {
  it('should return correctly', async () => {
    const result = await createIdentityCheck(createIdentityCheckArgsMock, mockContext)
    expect(callCreateIdentityCheckAPI).toHaveBeenCalledWith(createIdentityCheckArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateIdentityCheck', () => {
  it('should return correctly', async () => {
    const result = await updateIdentityCheck(updateIdentityCheckArgsMock, mockContext)
    expect(callUpdateIdentityCheckAPI).toHaveBeenCalledWith(updateIdentityCheckArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
