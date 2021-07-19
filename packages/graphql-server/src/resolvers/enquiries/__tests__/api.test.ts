import { mockContext } from '../../../__stubs__/mock-context'
import { callGetEnquiriesAPI, callCreateEnquiryAPI, callGetEnquiryByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { mockEnquiries } from '../__stubs__/mock-enquiries'
import { mockEnquiry } from '../__stubs__/mock-enquiry'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'
import { mockCreateEnquiryArgs } from '../__stubs__/mock-create-enquiry'

jest.mock('../../../utils/get-id-from-create-headers', () => ({
  getIdFromCreateHeaders: jest.fn(),
}))

jest.mock('../../../utils/handle-error', () => ({
  handleError: jest.fn(() => Promise.resolve('caught error')),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/axios-instances', () => ({
  createPlatformAxiosInstance: jest.fn(() => ({
    get: jest.fn().mockImplementation((value) => {
      if (value === '/enquiries/id') {
        return {
          data: mockEnquiry,
        }
      }
      return {
        data: mockEnquiries,
      }
    }),
    post: jest.fn().mockImplementation(() => mockEnquiry),
  })),
}))

describe('callGetEnquiriesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockEnquiries })),
    })
    const args = { pageSize: 1 }
    const result = await callGetEnquiriesAPI(args, mockContext)
    expect(result).toEqual(mockEnquiries)
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { pageSize: 1 }
    const result = await callGetEnquiriesAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callGetEnquiryByIdAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: mockEnquiry })),
    })
    const args = { id: mockEnquiry.id }
    const result = await callGetEnquiryByIdAPI(args, mockContext)
    expect(result).toEqual(mockEnquiry)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: mockEnquiry.id }
    const result = await callGetEnquiryByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateEnquiryAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: mockEnquiry })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(mockEnquiry.id)
    await callCreateEnquiryAPI(mockCreateEnquiryArgs, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateEnquiryAPI(mockCreateEnquiryArgs, mockContext)
    expect(result).toEqual('caught error')
  })
})
