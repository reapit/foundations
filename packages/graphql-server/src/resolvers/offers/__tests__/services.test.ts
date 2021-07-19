import { callGetOfferByIdAPI, callGetOffersAPI, callCreateOfferAPI, callUpdateOfferAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateOfferArgs } from '../__stubs__/mock-create-offer'
import { mockUpdateOfferArgs } from '../__stubs__/mock-update-offer'
import { getOfferById, getOffers, createOffer, updateOffer } from '../services'
import { mockOffer } from '../__stubs__/mock-offer'
import { mockOffers } from '../__stubs__/mock-offers'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetOfferByIdAPI: jest.fn(() => Promise.resolve(mockOffer)),
  callGetOffersAPI: jest.fn(() => Promise.resolve(mockOffers)),
  callCreateOfferAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateOfferAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getOfferById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getOfferById(args, mockContext)
    expect(callGetOfferByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockOffer)
  })
})

describe('getOffers', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getOffers(args, mockContext)
    expect(callGetOffersAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockOffers)
  })
})

describe('createOffer', () => {
  it('should return correctly', async () => {
    const result = await createOffer(mockCreateOfferArgs, mockContext)
    expect(callCreateOfferAPI).toHaveBeenCalledWith(mockCreateOfferArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateOffer', () => {
  it('should return correctly', async () => {
    const result = await updateOffer(mockUpdateOfferArgs, mockContext)
    expect(callUpdateOfferAPI).toHaveBeenCalledWith(mockUpdateOfferArgs, mockContext)
    expect(result).toEqual(true)
  })
})
