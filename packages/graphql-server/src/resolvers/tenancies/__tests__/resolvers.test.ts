import tenancyServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetTenancies,
  queryGetTenancyById,
  queryGetTenancyChecks,
  queryGetTenancyCheckById,
  queryGetTenancyRelationships,
  mutationCreateTenancy,
  mutationCreateTenancyCheck,
  mutationDeleteTenancyCheck,
  mutationUpdateTenancyCheck,
} from '../resolvers'
import {
  tenancyMock,
  tenanciesListMock,
  tenancyChecksListMock,
  tenancyCheckMock,
  tenancyRelationshipsListMock,
} from '../__stubs__/mock-tenancy-query'
import {
  createTenancyCheckArgsMock,
  createTenancyArgsMock,
  deleteTenancyCheckArgsMock,
  updateTenancyCheckArgsMock,
} from '../__stubs__/mock-tenancy-mutation'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getTenancies: jest.fn(() => tenanciesListMock),
  getTenancyById: jest.fn(() => tenancyMock),
  getTenancyChecks: jest.fn(() => tenancyChecksListMock),
  getTenancyCheckById: jest.fn(() => tenancyCheckMock),
  getTenancyRelationships: jest.fn(() => tenancyRelationshipsListMock),
  createTenancy: jest.fn(() => tenancyMock),
  createTenancyCheck: jest.fn(() => tenancyCheckMock),
  deleteTenancyCheck: jest.fn(() => true),
  updateTenancyCheck: jest.fn(() => tenancyCheckMock),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetTenancies', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { pageSize: 1 }
    const result = queryGetTenancies(null, args, mockContext)
    expect(result).toEqual(tenancyServices.getTenancies(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { pageSize: 1 }
    const result = queryGetTenancies(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetTenancyById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'RPT200113' }
    const result = queryGetTenancyById(null, args, mockContext)
    expect(result).toEqual(tenancyServices.getTenancyById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'RPT200113' }
    const result = queryGetTenancyById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetTenancyRelationships', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'RPT200113' }
    const result = queryGetTenancyRelationships(null, args, mockContext)
    expect(result).toEqual(tenancyServices.getTenancyRelationships(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'RPT200113' }
    const result = queryGetTenancyRelationships(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetTenancyChecks', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'RPT200113' }
    const result = queryGetTenancyChecks(null, args, mockContext)
    expect(result).toEqual(tenancyServices.getTenancyChecks(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'RPT200113' }
    const result = queryGetTenancyChecks(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetTenancyCheckById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'RPT200113', checkId: 'RPT20000517' }
    const result = queryGetTenancyCheckById(null, args, mockContext)
    expect(result).toEqual(tenancyServices.getTenancyCheckById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'RPT200113', checkId: 'RPT20000517' }
    const result = queryGetTenancyCheckById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateTenancy', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateTenancy(null, createTenancyArgsMock, mockContext)
    expect(result).toEqual(tenancyServices.createTenancy(createTenancyArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateTenancy(null, createTenancyArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateTenancyCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateTenancyCheck(null, createTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(tenancyServices.createTenancyCheck(createTenancyCheckArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateTenancyCheck(null, createTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteTenancyCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteTenancyCheck(null, deleteTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(tenancyServices.deleteTenancyCheck(deleteTenancyCheckArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteTenancyCheck(null, deleteTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateTenancyCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateTenancyCheck(null, updateTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(tenancyServices.updateTenancyCheck(updateTenancyCheckArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateTenancyCheck(null, updateTenancyCheckArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
