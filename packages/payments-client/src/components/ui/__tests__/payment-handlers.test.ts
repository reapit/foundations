import { fetcher } from '@reapit/elements'
import {
  generateEmailPaymentReceiptExternal,
  generateEmailPaymentReceiptInternal,
  // generatePaymentApiKey,
  updatePaymentSessionStatus,
  updatePaymentStatus,
} from '../../../services/payment'
import {
  handleCreateTransaction,
  onUpdateStatus,
  onHandleSubmit,
  handlePaymentRequestSubmit,
} from '../payment-handlers'
import { stubCardDetails, stubPaymentWithPropertyModel } from '../__stubs__/payment'
import * as Handlers from '../payment-handlers'
import { PaymentEmailRequestModel } from '../payment-request-modal'
jest.mock('@reapit/elements')

const session = '475625c2-af01-4e64-a948-c504992f5e'
const paymentId = 'MKT20000010'
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock
const merchantKey = {
  merchantSessionKey: 'merchantSessionKey',
  expiry: '2021-08-26T19:00:12.357Z',
}

jest.mock('../../../services/payment', () => ({
  generateEmailPaymentRequest: jest.fn(() => true),
  generatePaymentApiKey: jest.fn(() => true),
  updatePaymentStatus: jest.fn(() => true),
  updatePaymentSessionStatus: jest.fn(() => true),
  generateEmailPaymentReceiptExternal: jest.fn(() => true),
  generateEmailPaymentReceiptInternal: jest.fn(() => true),
}))

jest.mock('../../../services/opayo', () => ({
  opayoMerchantKeyService: jest.fn(() => true),
  opayoCreateTransactionService: jest.fn(() => true),
}))

jest.mock('../../../core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectSession: jest.fn(() => ({
      loginIdentity: {
        clientId: 'SBOX',
      },
    })),
  },
}))

describe('onUpdateStatus', () => {
  const stubUpdateStatusParams = { paymentId: 'paymentId', clientCode: 'clientCode', _eTag: '_eTag' }
  const stubUpdateStatusParamsWithSession = {
    ...stubUpdateStatusParams,
    session: 'session',
  }
  const stubEmailBody = {
    receipientEmail: stubCardDetails.email,
    recipientName: `${stubCardDetails.customerFirstName} ${stubCardDetails.customerLastName}`,
    paymentReason: stubPaymentWithPropertyModel?.description,
    paymentAmount: stubPaymentWithPropertyModel?.amount,
    paymentCurrency: 'GBP',
  }
  const stubBody = { status: 'posted', externalReference: '' }
  it('it should call update session status and generate email correctly then refetch payment', async () => {
    const mockedRefetch = jest.fn()
    const mockSetLoading = jest.fn()
    await onUpdateStatus(
      stubBody,
      stubUpdateStatusParams,
      stubCardDetails,
      stubPaymentWithPropertyModel,
      mockedRefetch,
      mockSetLoading,
    )
    expect(updatePaymentStatus).toHaveBeenCalledWith(stubBody, stubUpdateStatusParams)
    expect(generateEmailPaymentReceiptInternal).toHaveBeenCalledWith(stubEmailBody, stubUpdateStatusParams)
    expect(mockedRefetch).toHaveBeenCalled()
    expect(mockSetLoading).toHaveBeenCalledWith(false)
  })

  it('it should call update session status and generate email correctly then refetch payment with a session', async () => {
    const mockedRefetch = jest.fn()
    const mockSetLoading = jest.fn()
    await onUpdateStatus(
      stubBody,
      stubUpdateStatusParamsWithSession,
      stubCardDetails,
      stubPaymentWithPropertyModel,
      mockedRefetch,
      mockSetLoading,
    )
    expect(updatePaymentSessionStatus).toHaveBeenCalledWith(stubBody, stubUpdateStatusParamsWithSession)
    expect(generateEmailPaymentReceiptExternal).toHaveBeenCalledWith(stubEmailBody, stubUpdateStatusParamsWithSession)
    expect(mockedRefetch).toHaveBeenCalled()
    expect(mockSetLoading).toHaveBeenCalledWith(false)
  })
})

describe('onHandleSubmit', () => {
  window.sagepayOwnForm = jest.fn().mockReturnValue({ tokeniseCardDetails: jest.fn() })
  const onSubmit = onHandleSubmit(merchantKey, stubPaymentWithPropertyModel, paymentId, jest.fn(), jest.fn(), session)

  it('should correctly call the opayo method', () => {
    onSubmit(stubCardDetails)
    expect(window.sagepayOwnForm).toHaveBeenCalled()
  })
})

describe('handleCreateTransaction', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should correctly call update', async () => {
    const updateSatusSpy = jest.spyOn(Handlers, 'onUpdateStatus')
    mockedFetch.mockReturnValueOnce(mockResponse)
    const onTokenised = handleCreateTransaction(
      merchantKey,
      stubPaymentWithPropertyModel,
      stubCardDetails,
      paymentId,
      jest.fn(),
      jest.fn(),
      session,
    )
    await onTokenised({ success: true })
    expect(updateSatusSpy).toHaveBeenCalledTimes(1)
  })

  it('should correctly call update', async () => {
    const updateSatusSpy = jest.spyOn(Handlers, 'onUpdateStatus')
    mockedFetch.mockReturnValueOnce(false)
    const onTokenised = handleCreateTransaction(
      merchantKey,
      stubPaymentWithPropertyModel,
      stubCardDetails,
      paymentId,
      jest.fn(),
      jest.fn(),
      session,
    )
    await onTokenised({ success: false })
    expect(updateSatusSpy).toHaveBeenCalledTimes(1)
  })
})

describe('handlePaymentRequestSubmit', () => {
  it('should correctly call email service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    const mockSetLoading = jest.fn()
    const mockHandleOnClose = jest.fn()
    const curried = handlePaymentRequestSubmit(mockSetLoading, mockHandleOnClose)
    await curried({ keyExpiresAt: new Date('2030-01-01') } as PaymentEmailRequestModel)
    // expect(generatePaymentApiKey).toHaveBeenCalledTimes(1)
  })
})
