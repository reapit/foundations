import conveyancingServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import {
  queryGetConveyancingById,
  queryGetConveyancing,
  mutationUpdateConveyancing,
  queryGetConveyancingChain,
  mutationCreateDownwardLinkModel,
  mutationCreateUpwardLinkModel,
  mutationDeleteDownwardLinkModel,
  mutationDeleteUpwardLinkModel,
} from '../resolvers'
import { mockUpdateConveyancingArgs } from '../__stubs__/mock-update-conveyancing'
import { mockConveyancingDetail } from '../__stubs__/mock-conveyancing-detail'
import { mockConveyancing } from '../__stubs__/mock-conveyancing'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockConveyancingChain } from '../__stubs__/mock-conveyancing-chain'
import { mockCreateDownwardLinkModelArgs } from '../__stubs__/mock-create-downward-link-model'
import { mockCreateUpwardLinkModelArgs } from '../__stubs__/mock-create-upward-link-model'
import { mockDeleteDownwardLinkModelArgs } from '../__stubs__/mock-delete-downward-link-model'
import { mockDeleteUpwardLinkModelArgs } from '../__stubs__/mock-delete-upward-link-model'

jest.mock('../services', () => ({
  getConveyancingById: jest.fn(() => mockConveyancingDetail),
  getConveyancing: jest.fn(() => mockConveyancing),
  getConveyancingChain: jest.fn(() => mockConveyancingChain),
  updateConveyancing: jest.fn(() => mockUpdateConveyancingArgs),
  createDownwardLinkModel: jest.fn(() => mockCreateDownwardLinkModelArgs),
  createUpwardLinkModel: jest.fn(() => mockCreateUpwardLinkModelArgs),
  deleteDownwardLinkModel: jest.fn(() => mockDeleteDownwardLinkModelArgs),
  deleteUpwardLinkModel: jest.fn(() => mockDeleteUpwardLinkModelArgs),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetConveyancingById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetConveyancingById(null, args, mockContext)
    expect(result).toEqual(conveyancingServices.getConveyancingById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetConveyancingById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetConveyancing', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetConveyancing(null, args, mockContext)
    expect(result).toEqual(conveyancingServices.getConveyancing(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetConveyancing(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetConveyancingChain', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetConveyancingChain(null, args, mockContext)
    expect(result).toEqual(conveyancingServices.getConveyancingChain(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetConveyancingChain(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateConveyancing', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateConveyancing(null, mockUpdateConveyancingArgs, mockContext)
    expect(result).toEqual(conveyancingServices.updateConveyancing(mockUpdateConveyancingArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateConveyancing(null, mockUpdateConveyancingArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateDownwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateDownwardLinkModel(null, mockCreateDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(conveyancingServices.createDownwardLinkModel(mockCreateDownwardLinkModelArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateDownwardLinkModel(null, mockCreateDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateUpwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateUpwardLinkModel(null, mockCreateUpwardLinkModelArgs, mockContext)
    expect(result).toEqual(conveyancingServices.createUpwardLinkModel(mockCreateUpwardLinkModelArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateUpwardLinkModel(null, mockCreateUpwardLinkModelArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateDownwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateDownwardLinkModel(null, mockCreateDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(conveyancingServices.createDownwardLinkModel(mockCreateDownwardLinkModelArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateDownwardLinkModel(null, mockCreateDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteDownwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteDownwardLinkModel(null, mockDeleteDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(conveyancingServices.deleteDownwardLinkModel(mockDeleteDownwardLinkModelArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteDownwardLinkModel(null, mockDeleteDownwardLinkModelArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteUpwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteUpwardLinkModel(null, mockDeleteUpwardLinkModelArgs, mockContext)
    expect(result).toEqual(conveyancingServices.deleteUpwardLinkModel(mockDeleteUpwardLinkModelArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteUpwardLinkModel(null, mockDeleteUpwardLinkModelArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
