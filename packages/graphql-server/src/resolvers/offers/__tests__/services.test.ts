import { callGetOfferByIdAPI, callGetOffersAPI, callCreateOfferAPI, callUpdateOfferAPI } from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createOfferArgsMock } from '../__mocks__/create-offer'
import { updateOfferArgsMock } from '../__mocks__/update-offer'
import { getOfferById, getOffers, createOffer, updateOffer } from '../services'
import { offerMock } from '../__mocks__/offer'
import { offersMock } from '../__mocks__/offers'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetOfferByIdAPI: jest.fn(() => Promise.resolve(offerMock)),
  callGetOffersAPI: jest.fn(() => Promise.resolve(offersMock)),
  callCreateOfferAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateOfferAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getOfferById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getOfferById(args, mockContext)
    expect(callGetOfferByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(offerMock)
  })
})

describe('getOffers', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getOffers(args, mockContext)
    expect(callGetOffersAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(offersMock)
  })
})

describe('createOffer', () => {
  it('should return correctly', async () => {
    const result = await createOffer(createOfferArgsMock, mockContext)
    expect(callCreateOfferAPI).toHaveBeenCalledWith(createOfferArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateOffer', () => {
  it('should return correctly', async () => {
    const result = await updateOffer(updateOfferArgsMock, mockContext)
    expect(callUpdateOfferAPI).toHaveBeenCalledWith(updateOfferArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
