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
import { updateConveyancingArgsMock } from '../__stubs__/update-conveyancing'
import { conveyancingDetailMock } from '../__stubs__/conveyancing-detail'
import { conveyancingMock } from '../__stubs__/conveyancing'
import { mockContext } from '../../../__stubs__/context'
import { conveyancingChainMock } from '../__stubs__/conveyancing-chain'
import { createDownwardLinkModelArgsMock } from '../__stubs__/create-downward-link-model'
import { createUpwardLinkModelArgsMock } from '../__stubs__/create-upward-link-model'
import { deleteDownwardLinkModelArgsMock } from '../__stubs__/delete-downward-link-model'
import { deleteUpwardLinkModelArgsMock } from '../__stubs__/delete-upward-link-model'

jest.mock('../services', () => ({
  getConveyancingById: jest.fn(() => conveyancingDetailMock),
  getConveyancing: jest.fn(() => conveyancingMock),
  getConveyancingChain: jest.fn(() => conveyancingChainMock),
  updateConveyancing: jest.fn(() => updateConveyancingArgsMock),
  createDownwardLinkModel: jest.fn(() => createDownwardLinkModelArgsMock),
  createUpwardLinkModel: jest.fn(() => createUpwardLinkModelArgsMock),
  deleteDownwardLinkModel: jest.fn(() => deleteDownwardLinkModelArgsMock),
  deleteUpwardLinkModel: jest.fn(() => deleteUpwardLinkModelArgsMock),
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
    const result = mutationUpdateConveyancing(null, updateConveyancingArgsMock, mockContext)
    expect(result).toEqual(conveyancingServices.updateConveyancing(updateConveyancingArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateConveyancing(null, updateConveyancingArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateDownwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateDownwardLinkModel(null, createDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingServices.createDownwardLinkModel(createDownwardLinkModelArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateDownwardLinkModel(null, createDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateUpwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateUpwardLinkModel(null, createUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingServices.createUpwardLinkModel(createUpwardLinkModelArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateUpwardLinkModel(null, createUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateDownwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateDownwardLinkModel(null, createDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingServices.createDownwardLinkModel(createDownwardLinkModelArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateDownwardLinkModel(null, createDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteDownwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteDownwardLinkModel(null, deleteDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingServices.deleteDownwardLinkModel(deleteDownwardLinkModelArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteDownwardLinkModel(null, deleteDownwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationDeleteUpwardLinkModel', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationDeleteUpwardLinkModel(null, deleteUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(conveyancingServices.deleteUpwardLinkModel(deleteUpwardLinkModelArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationDeleteUpwardLinkModel(null, deleteUpwardLinkModelArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
