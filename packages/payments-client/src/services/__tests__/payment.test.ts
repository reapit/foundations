import {
  updatePaymentStatus,
  updatePaymentSessionStatus,
  generatePaymentApiKey,
  generateEmailPaymentRequest,
  generateEmailPaymentReceiptInternal,
  generateEmailPaymentReceiptExternal,
} from '../payment'
import { fetcher } from '@reapit/elements'
import { body, params } from '../__stubs__/payment'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

describe('updatePaymentStatus', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await updatePaymentStatus(body, params)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updatePaymentStatus(body, params)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to update user')
  })
})

describe('updatePaymentSessionStatus  ', () => {
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await updatePaymentSessionStatus(body, params)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updatePaymentSessionStatus(body, params)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to update user')
  })
})

describe('generatePaymentApiKey  ', () => {
  const bodyApiKey = {
    clientCode: 'SOME_CODE',
    paymentId: 'SOME_PAYMENT_ID',
    keyExpiresAt: 'keyExpiresAt',
  }
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await generatePaymentApiKey(bodyApiKey)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await generatePaymentApiKey(bodyApiKey)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to generate api key')
  })
})

describe('generateEmailPaymentRequest  ', () => {
  const bodyEmailRequest = {
    receipientEmail: 'SOME_EMAIL',
    recipientName: 'SOME_NAME',
    paymentReason: 'SOME_REASON',
    paymentAmount: 1000,
    paymentCurrency: 'GBP',
    paymentExpiry: 'paymentExpiry',
  }
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await generateEmailPaymentRequest(bodyEmailRequest, params)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await generateEmailPaymentRequest(bodyEmailRequest, params)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to generate email payment request')
  })
})

describe('generateEmailPaymentReceiptInternal  ', () => {
  const bodyEmailReceipt = {
    receipientEmail: 'SOME_EMAIL',
    recipientName: 'SOME_NAME',
    paymentReason: 'SOME_REASON',
    paymentAmount: 1000,
    paymentCurrency: 'GBP',
  }
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await generateEmailPaymentReceiptInternal(bodyEmailReceipt, params)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await generateEmailPaymentReceiptInternal(bodyEmailReceipt, params)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to generate email payment receipt')
  })
})

describe('generateEmailPaymentReceiptExternal  ', () => {
  const bodyEmailReceipt = {
    receipientEmail: 'SOME_EMAIL',
    recipientName: 'SOME_NAME',
    paymentReason: 'SOME_REASON',
    paymentAmount: 1000,
    paymentCurrency: 'GBP',
  }
  it('should return a response from the service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await generateEmailPaymentReceiptExternal(bodyEmailReceipt, params)).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await generateEmailPaymentReceiptExternal(bodyEmailReceipt, params)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to generate email payment receipt')
  })
})
