import offerServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetOfferById, queryGetOffers, mutationCreateOffer, mutationUpdateOffer } from '../resolvers'
import { mockCreateOfferArgs } from '../__stubs__/mock-create-offer'
import { mockUpdateOfferArgs } from '../__stubs__/mock-update-offer'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockOffer } from '../__stubs__/mock-offer'
import { mockOffers } from '../__stubs__/mock-offers'

jest.mock('../services', () => ({
  getOfferById: jest.fn(() => mockOffer),
  getOffers: jest.fn(() => mockOffers),
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
    const result = mutationCreateOffer(null, mockCreateOfferArgs, mockContext)
    expect(result).toEqual(offerServices.createOffer(mockCreateOfferArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateOffer(null, mockCreateOfferArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateOffer', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateOffer(null, mockUpdateOfferArgs, mockContext)
    expect(result).toEqual(offerServices.updateOffer(mockUpdateOfferArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateOffer(null, mockUpdateOfferArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
