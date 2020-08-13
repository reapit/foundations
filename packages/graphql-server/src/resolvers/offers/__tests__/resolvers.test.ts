import offerServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetOfferById, queryGetOffers, mutationCreateOffer, mutationUpdateOffer } from '../resolvers'
import { createOfferArgsMock } from '../__stubs__/create-offer'
import { updateOfferArgsMock } from '../__stubs__/update-offer'
import { offerMock } from '../__stubs__/offer'
import { offersMock } from '../__stubs__/offers'
import { mockContext } from '../../../__stubs__/context'

jest.mock('../services', () => ({
  getOfferById: jest.fn(() => offerMock),
  getOffers: jest.fn(() => offersMock),
  createOffer: jest.fn(() => true),
  updateOffer: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetOfferById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetOfferById(null, args, mockContext)
    expect(result).toEqual(offerServices.getOfferById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetOfferById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetOffers', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetOffers(null, args, mockContext)
    expect(result).toEqual(offerServices.getOffers(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetOffers(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateOffer', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateOffer(null, createOfferArgsMock, mockContext)
    expect(result).toEqual(offerServices.createOffer(createOfferArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateOffer(null, createOfferArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateOffer', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateOffer(null, updateOfferArgsMock, mockContext)
    expect(result).toEqual(offerServices.updateOffer(updateOfferArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateOffer(null, updateOfferArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
