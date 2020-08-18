import enquirieServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetEnquiryById, queryGetEnquiries, mutationCreateEnquiry } from '../resolvers'
import { createEnquiryArgsMock } from '../__stubs__/create-enquiry'
import { enquiryMock } from '../__stubs__/enquiry'
import { enquiriesMock } from '../__stubs__/enquiries'
import { mockContext } from '../../../__stubs__/context'

jest.mock('../services', () => ({
  getEnquiryById: jest.fn(() => enquiryMock),
  getEnquiries: jest.fn(() => enquiriesMock),
  createEnquiry: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetEnquiryById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 5 }
    const result = queryGetEnquiryById(null, args, mockContext)
    expect(result).toEqual(enquirieServices.getEnquiryById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 5 }
    const result = queryGetEnquiryById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetEnquiries', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetEnquiries(null, args, mockContext)
    expect(result).toEqual(enquirieServices.getEnquiries(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetEnquiries(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateEnquiry', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateEnquiry(null, createEnquiryArgsMock, mockContext)
    expect(result).toEqual(enquirieServices.createEnquiry(createEnquiryArgsMock, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateEnquiry(null, createEnquiryArgsMock, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
