import {
  callGetTenanciesAPI,
  callGetTenancyByIdAPI,
  callGetTenancyChecksAPI,
  callGetTenancyCheckByIdAPI,
  callGetTenancyRelationshipsAPI,
  callCreateTenancyAPI,
  callCreateTenancyCheckAPI,
  callDeleteTenancyCheckAPI,
  callUpdateTenancyCheckAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import {
  mockTenancy,
  mockTenanciesList,
  mockTenancyCheck,
  mockTenancyChecksList,
  mockTenancyRelationshipsList,
} from '../__stubs__/mock-tenancy-query'
import {
  mockCreateTenancyArgs,
  mockCreateTenancyCheckArgs,
  mockDeleteTenancyCheckArgs,
  mockUpdateTenancyCheckArgs,
} from '../__stubs__/mock-tenancy-mutation'
import {
  getTenancies,
  getTenancyById,
  getTenancyChecks,
  getTenancyCheckById,
  getTenancyRelationships,
  createTenancy,
  createTenancyCheck,
  deleteTenancyCheck,
  updateTenancyCheck,
} from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetTenanciesAPI: jest.fn(() => Promise.resolve(mockTenanciesList)),
  callGetTenancyByIdAPI: jest.fn(() => Promise.resolve(mockTenancy)),
  callGetTenancyChecksAPI: jest.fn(() => Promise.resolve(mockTenancyChecksList)),
  callGetTenancyCheckByIdAPI: jest.fn(() => Promise.resolve(mockTenancyCheck)),
  callGetTenancyRelationshipsAPI: jest.fn(() => Promise.resolve(mockTenancyRelationshipsList)),
  callCreateTenancyAPI: jest.fn(() => Promise.resolve(mockTenancy)),
  callCreateTenancyCheckAPI: jest.fn(() => Promise.resolve(mockTenancyCheck)),
  callDeleteTenancyCheckAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateTenancyCheckAPI: jest.fn(() => Promise.resolve(mockTenancyCheck)),
}))

describe('getTenancies', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getTenancies(args, mockContext)
    expect(callGetTenanciesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockTenanciesList)
  })
})

describe('getTenancyById', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getTenancyById(args, mockContext)
    expect(callGetTenancyByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockTenancy)
  })
})

describe('getTenancyRelationships', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getTenancyRelationships(args, mockContext)
    expect(callGetTenancyRelationshipsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockTenancyRelationshipsList)
  })
})

describe('getTenancyChecks', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getTenancyChecks(args, mockContext)
    expect(callGetTenancyChecksAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockTenancyChecksList)
  })
})

describe('getTenancyCheckById', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113', checkId: 'RPT20000517' }
    const result = await getTenancyCheckById(args, mockContext)
    expect(callGetTenancyCheckByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockTenancyCheck)
  })
})

describe('createTenancy', () => {
  it('should return correctly', async () => {
    const result = await createTenancy(mockCreateTenancyArgs, mockContext)
    expect(callCreateTenancyAPI).toHaveBeenCalledWith(mockCreateTenancyArgs, mockContext)
    expect(result).toEqual(mockTenancy)
  })
})

describe('createTenancyCheck', () => {
  it('should return correctly', async () => {
    const result = await createTenancyCheck(mockCreateTenancyCheckArgs, mockContext)
    expect(callCreateTenancyCheckAPI).toHaveBeenCalledWith(mockCreateTenancyCheckArgs, mockContext)
    expect(result).toEqual(mockTenancyCheck)
  })
})

describe('deleteTenancyCheck', () => {
  it('should return correctly', async () => {
    const result = await deleteTenancyCheck(mockDeleteTenancyCheckArgs, mockContext)
    expect(callDeleteTenancyCheckAPI).toHaveBeenCalledWith(mockDeleteTenancyCheckArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateTenancyCheck', () => {
  it('should return correctly', async () => {
    const result = await updateTenancyCheck(mockUpdateTenancyCheckArgs, mockContext)
    expect(callUpdateTenancyCheckAPI).toHaveBeenCalledWith(mockUpdateTenancyCheckArgs, mockContext)
    expect(result).toEqual(mockTenancyCheck)
  })
})
