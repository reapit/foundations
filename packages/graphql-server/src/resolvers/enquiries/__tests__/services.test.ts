import { callGetEnquiryByIdAPI, callGetEnquiriesAPI, callCreateEnquiryAPI } from '../api'
import { mockContext } from '../../../__stubs__/context'
import { createEnquiryArgsMock } from '../__stubs__/create-enquiry'
import { getEnquiryById, getEnquiries, createEnquiry } from '../services'
import { enquiryMock } from '../__stubs__/enquiry'
import { enquiriesMock } from '../__stubs__/enquiries'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetEnquiryByIdAPI: jest.fn(() => Promise.resolve(enquiryMock)),
  callGetEnquiriesAPI: jest.fn(() => Promise.resolve(enquiriesMock)),
  callCreateEnquiryAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getEnquirieById', () => {
  it('should return correctly', async () => {
    const args = { id: 5 }
    const result = await getEnquiryById(args, mockContext)
    expect(callGetEnquiryByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(enquiryMock)
  })
})

describe('getEnquiries', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getEnquiries(args, mockContext)
    expect(callGetEnquiriesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(enquiriesMock)
  })
})

describe('createEnquirie', () => {
  it('should return correctly', async () => {
    const result = await createEnquiry(createEnquiryArgsMock, mockContext)
    expect(callCreateEnquiryAPI).toHaveBeenCalledWith(createEnquiryArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
