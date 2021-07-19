import enquirieServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetEnquiryById, queryGetEnquiries, mutationCreateEnquiry } from '../resolvers'
import { mockCreateEnquiryArgs } from '../__stubs__/mock-create-enquiry'
import { mockEnquiry } from '../__stubs__/mock-enquiry'
import { mockEnquiries } from '../__stubs__/mock-enquiries'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getEnquiryById: jest.fn(() => mockEnquiry),
  getEnquiries: jest.fn(() => mockEnquiries),
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
    const result = mutationCreateEnquiry(null, mockCreateEnquiryArgs, mockContext)
    expect(result).toEqual(enquirieServices.createEnquiry(mockCreateEnquiryArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateEnquiry(null, mockCreateEnquiryArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
