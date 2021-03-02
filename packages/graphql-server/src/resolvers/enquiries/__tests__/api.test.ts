import { mockContext } from '../../../__stubs__/mock-context'
import { callGetEnquiriesAPI, callCreateEnquiryAPI, callGetEnquiryByIdAPI } from '../api'
import { createPlatformAxiosInstance } from '../../../utils/axios-instances'
import { enquiriesMock } from '../__stubs__/mock-enquiries'
import { enquiryMock } from '../__stubs__/mock-enquiry'
import { getIdFromCreateHeaders } from '../../../utils/get-id-from-create-headers'
import { createEnquiryArgsMock } from '../__stubs__/mock-create-enquiry'

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
          data: enquiryMock,
        }
      }
      return {
        data: enquiriesMock,
      }
    }),
    post: jest.fn().mockImplementation(() => enquiryMock),
  })),
}))

describe('callGetEnquiriesAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.resolve({ data: enquiriesMock })),
    })
    const args = { pageSize: 1 }
    const result = await callGetEnquiriesAPI(args, mockContext)
    expect(result).toEqual(enquiriesMock)
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
      get: jest.fn(() => Promise.resolve({ data: enquiryMock })),
    })
    const args = { id: enquiryMock.id }
    const result = await callGetEnquiryByIdAPI(args, mockContext)
    expect(result).toEqual(enquiryMock)
  })

  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      get: jest.fn(() => Promise.reject('error caught')),
    })
    const args = { id: enquiryMock.id }
    const result = await callGetEnquiryByIdAPI(args, mockContext)
    expect(result).toEqual('caught error')
  })
})

describe('callCreateEnquiryAPI', () => {
  it('should work correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.resolve({ headers: 'header' })),
      get: jest.fn(() => Promise.resolve({ data: enquiryMock })),
    })
    ;(getIdFromCreateHeaders as jest.Mocked<any>).mockReturnValueOnce(enquiryMock.id)
    await callCreateEnquiryAPI(createEnquiryArgsMock, mockContext)
    expect(getIdFromCreateHeaders).toHaveBeenCalledWith({ headers: 'header' })
  })
  it('should catch error correctly', async () => {
    ;(createPlatformAxiosInstance as jest.Mocked<any>).mockReturnValueOnce({
      post: jest.fn(() => Promise.reject('error caught')),
    })
    const result = await callCreateEnquiryAPI(createEnquiryArgsMock, mockContext)
    expect(result).toEqual('caught error')
  })
})
