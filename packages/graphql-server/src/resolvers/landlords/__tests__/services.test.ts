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
import { mockContext } from '../../../__stubs__/context'
import {
  tenancyMock,
  tenanciesListMock,
  tenancyCheckMock,
  tenancyChecksListMock,
  tenancyRelationshipsListMock,
} from '../__stubs__/tenancy-query'
import {
  createTenancyArgsMock,
  createTenancyCheckArgsMock,
  deleteTenancyCheckArgsMock,
  updateTenancyCheckArgsMock,
} from '../__stubs__/tenancy-mutation'
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
  callGetTenanciesAPI: jest.fn(() => Promise.resolve(tenanciesListMock)),
  callGetTenancyByIdAPI: jest.fn(() => Promise.resolve(tenancyMock)),
  callGetTenancyChecksAPI: jest.fn(() => Promise.resolve(tenancyChecksListMock)),
  callGetTenancyCheckByIdAPI: jest.fn(() => Promise.resolve(tenancyCheckMock)),
  callGetTenancyRelationshipsAPI: jest.fn(() => Promise.resolve(tenancyRelationshipsListMock)),
  callCreateTenancyAPI: jest.fn(() => Promise.resolve(tenancyMock)),
  callCreateTenancyCheckAPI: jest.fn(() => Promise.resolve(tenancyCheckMock)),
  callDeleteTenancyCheckAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateTenancyCheckAPI: jest.fn(() => Promise.resolve(tenancyCheckMock)),
}))

describe('getTenancies', () => {
  it('should return correctly', async () => {
    const args = { pageSize: 1 }
    const result = await getTenancies(args, mockContext)
    expect(callGetTenanciesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(tenanciesListMock)
  })
})

describe('getTenancyById', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getTenancyById(args, mockContext)
    expect(callGetTenancyByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(tenancyMock)
  })
})

describe('getTenancyRelationships', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getTenancyRelationships(args, mockContext)
    expect(callGetTenancyRelationshipsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(tenancyRelationshipsListMock)
  })
})

describe('getTenancyChecks', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113' }
    const result = await getTenancyChecks(args, mockContext)
    expect(callGetTenancyChecksAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(tenancyChecksListMock)
  })
})

describe('getTenancyCheckById', () => {
  it('should return correctly', async () => {
    const args = { id: 'RPT200113', checkId: 'RPT20000517' }
    const result = await getTenancyCheckById(args, mockContext)
    expect(callGetTenancyCheckByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(tenancyCheckMock)
  })
})

describe('createTenancy', () => {
  it('should return correctly', async () => {
    const result = await createTenancy(createTenancyArgsMock, mockContext)
    expect(callCreateTenancyAPI).toHaveBeenCalledWith(createTenancyArgsMock, mockContext)
    expect(result).toEqual(tenancyMock)
  })
})

describe('createTenancyCheck', () => {
  it('should return correctly', async () => {
    const result = await createTenancyCheck(createTenancyCheckArgsMock, mockContext)
    expect(callCreateTenancyCheckAPI).toHaveBeenCalledWith(createTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(tenancyCheckMock)
  })
})

describe('deleteTenancyCheck', () => {
  it('should return correctly', async () => {
    const result = await deleteTenancyCheck(deleteTenancyCheckArgsMock, mockContext)
    expect(callDeleteTenancyCheckAPI).toHaveBeenCalledWith(deleteTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateTenancyCheck', () => {
  it('should return correctly', async () => {
    const result = await updateTenancyCheck(updateTenancyCheckArgsMock, mockContext)
    expect(callUpdateTenancyCheckAPI).toHaveBeenCalledWith(updateTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(tenancyCheckMock)
  })
})
