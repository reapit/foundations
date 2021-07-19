import {
  callGetNegotiatorByIdAPI,
  callGetNegotiatorsAPI,
  callCreateNegotiatorAPI,
  callUpdateNegotiatorAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateNegotiatorArgs } from '../__stubs__/mock-create-negotiator'
import { mockUpdateNegotiatorArgs } from '../__stubs__/mock-update-negotiator'
import { getNegotiatorById, getNegotiators, createNegotiator, updateNegotiator } from '../services'
import { mockNegotiator } from '../__stubs__/mock-negotiator'
import { mockNegotiators } from '../__stubs__/mock-negotiators'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetNegotiatorByIdAPI: jest.fn(() => Promise.resolve(mockNegotiator)),
  callGetNegotiatorsAPI: jest.fn(() => Promise.resolve(mockNegotiators)),
  callCreateNegotiatorAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateNegotiatorAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getNegotiatorById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getNegotiatorById(args, mockContext)
    expect(callGetNegotiatorByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockNegotiator)
  })
})

describe('getNegotiators', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getNegotiators(args, mockContext)
    expect(callGetNegotiatorsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockNegotiators)
  })
})

describe('createNegotiator', () => {
  it('should return correctly', async () => {
    const result = await createNegotiator(mockCreateNegotiatorArgs, mockContext)
    expect(callCreateNegotiatorAPI).toHaveBeenCalledWith(mockCreateNegotiatorArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateNegotiator', () => {
  it('should return correctly', async () => {
    const result = await updateNegotiator(mockUpdateNegotiatorArgs, mockContext)
    expect(callUpdateNegotiatorAPI).toHaveBeenCalledWith(mockUpdateNegotiatorArgs, mockContext)
    expect(result).toEqual(true)
  })
})
