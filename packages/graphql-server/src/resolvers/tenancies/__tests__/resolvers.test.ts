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
  mockTenancy,
  mockTenanciesList,
  mockTenancyChecksList,
  mockTenancyCheck,
  mockTenancyRelationshipsList,
} from '../__stubs__/mock-tenancy-query'
import {
  mockCreateTenancyCheckArgs,
  mockCreateTenancyArgs,
  mockDeleteTenancyCheckArgs,
  mockUpdateTenancyCheckArgs,
} from '../__stubs__/mock-tenancy-mutation'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getTenancies: jest.fn(() => mockTenanciesList),
  getTenancyById: jest.fn(() => mockTenancy),
  getTenancyChecks: jest.fn(() => mockTenancyChecksList),
  getTenancyCheckById: jest.fn(() => mockTenancyCheck),
  getTenancyRelationships: jest.fn(() => mockTenancyRelationshipsList),
  createTenancy: jest.fn(() => mockTenancy),
  createTenancyCheck: jest.fn(() => mockTenancyCheck),
  deleteTenancyCheck: jest.fn(() => true),
  updateTenancyCheck: jest.fn(() => mockTenancyCheck),
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
    const result = mutationCreateTenancy(null, mockCreateTenancyArgs, mockContext)
    expect(result).toEqual(tenancyServices.createTenancy(mockCreateTenancyArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateTenancy(null, mockCreateTenancyArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateTenancyCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateTenancyCheck(null, mockCreateTenancyCheckArgs, mockContext)
    expect(result).toEqual(tenancyServices.createTenancyCheck(mockCreateTenancyCheckArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateTenancyCheck(null, mockCreateTenancyCheckArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteTenancyCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteTenancyCheck(null, mockDeleteTenancyCheckArgs, mockContext)
    expect(result).toEqual(tenancyServices.deleteTenancyCheck(mockDeleteTenancyCheckArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteTenancyCheck(null, mockDeleteTenancyCheckArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateTenancyCheck', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateTenancyCheck(null, mockUpdateTenancyCheckArgs, mockContext)
    expect(result).toEqual(tenancyServices.updateTenancyCheck(mockUpdateTenancyCheckArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateTenancyCheck(null, mockUpdateTenancyCheckArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
