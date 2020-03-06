import {
  callGetNegotiatorByIdAPI,
  callGetNegotiatorsAPI,
  callCreateNegotiatorAPI,
  callUpdateNegotiatorAPI,
} from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createNegotiatorArgsMock } from '../__mocks__/create-negotiator'
import { updateNegotiatorArgsMock } from '../__mocks__/update-negotiator'
import { getNegotiatorById, getNegotiators, createNegotiator, updateNegotiator } from '../services'
import { negotiatorMock } from '../__mocks__/negotiator'
import { negotiatorsMock } from '../__mocks__/negotiators'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetNegotiatorByIdAPI: jest.fn(() => Promise.resolve(negotiatorMock)),
  callGetNegotiatorsAPI: jest.fn(() => Promise.resolve(negotiatorsMock)),
  callCreateNegotiatorAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateNegotiatorAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getNegotiatorById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getNegotiatorById(args, mockContext)
    expect(callGetNegotiatorByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(negotiatorMock)
  })
})

describe('getNegotiators', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getNegotiators(args, mockContext)
    expect(callGetNegotiatorsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(negotiatorsMock)
  })
})

describe('createNegotiator', () => {
  it('should return correctly', async () => {
    const result = await createNegotiator(createNegotiatorArgsMock, mockContext)
    expect(callCreateNegotiatorAPI).toHaveBeenCalledWith(createNegotiatorArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateNegotiator', () => {
  it('should return correctly', async () => {
    const result = await updateNegotiator(updateNegotiatorArgsMock, mockContext)
    expect(callUpdateNegotiatorAPI).toHaveBeenCalledWith(updateNegotiatorArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
