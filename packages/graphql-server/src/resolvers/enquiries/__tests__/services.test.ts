import { callGetEnquiryByIdAPI, callGetEnquiriesAPI, callCreateEnquiryAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateEnquiryArgs } from '../__stubs__/mock-create-enquiry'
import { getEnquiryById, getEnquiries, createEnquiry } from '../services'
import { mockEnquiry } from '../__stubs__/mock-enquiry'
import { mockEnquiries } from '../__stubs__/mock-enquiries'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetEnquiryByIdAPI: jest.fn(() => Promise.resolve(mockEnquiry)),
  callGetEnquiriesAPI: jest.fn(() => Promise.resolve(mockEnquiries)),
  callCreateEnquiryAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getEnquirieById', () => {
  it('should return correctly', async () => {
    const args = { id: 5 }
    const result = await getEnquiryById(args, mockContext)
    expect(callGetEnquiryByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockEnquiry)
  })
})

describe('getEnquiries', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getEnquiries(args, mockContext)
    expect(callGetEnquiriesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockEnquiries)
  })
})

describe('createEnquirie', () => {
  it('should return correctly', async () => {
    const result = await createEnquiry(mockCreateEnquiryArgs, mockContext)
    expect(callCreateEnquiryAPI).toHaveBeenCalledWith(mockCreateEnquiryArgs, mockContext)
    expect(result).toEqual(true)
  })
})
