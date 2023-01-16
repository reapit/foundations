import { fetcher } from '@reapit/utils-common'
import {
  generateEmailPaymentReceiptExternal,
  generateEmailPaymentReceiptInternal,
  updatePaymentSessionStatus,
  updatePaymentStatus,
} from '../../../../services/payment'
import { handleCreateTransaction, onUpdateStatus, onHandleSubmit } from '../payment-handlers'
import { mockCardDetails, mockPaymentWithPropertyModel } from '../../../../tests/__mocks__/payment'
import * as Handlers from '../payment-handlers'

jest.mock('@reapit/utils-common')

const session = '475625c2-af01-4e64-a948-c504992f5e'
const paymentId = 'MKT20000010'
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock
const merchantKey = {
  merchantSessionKey: 'merchantSessionKey',
  expiry: '2021-08-26T19:00:12.357Z',
}

jest.mock('../../../../services/payment', () => ({
  generateEmailPaymentRequest: jest.fn(() => true),
  generatePaymentApiKey: jest.fn(() => true),
  updatePaymentStatus: jest.fn(() => true),
  updatePaymentSessionStatus: jest.fn(() => true),
  generateEmailPaymentReceiptExternal: jest.fn(() => true),
  generateEmailPaymentReceiptInternal: jest.fn(() => true),
}))

jest.mock('../../../../services/opayo', () => ({
  opayoMerchantKeyService: jest.fn(() => true),
  opayoCreateTransactionService: jest.fn(() => true),
}))

jest.mock('../../../../core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectSession: jest.fn(() => ({
      loginIdentity: {
        clientId: 'SBOX',
      },
    })),
  },
}))

describe('handlePaymentProvider', () => {
  it('should correctly call the opayo method', async () => {
    const setProviderLoading = jest.fn()
    const setPaymentProvider = jest.fn()
    const errorSnack = jest.fn()
    const clientCode = 'MOCK_CODE'
    const curried = Handlers.handlePaymentProvider(setProviderLoading, setPaymentProvider, errorSnack, clientCode)
    curried()

    await Promise.resolve()

    expect(setProviderLoading).toHaveBeenCalledWith(true)
    expect(setPaymentProvider).toHaveBeenCalledWith({ merchantKey: true, providerName: 'opayo' })
    expect(setProviderLoading).toHaveBeenCalledWith(false)
  })
})

describe('onUpdateStatus', () => {
  const stubUpdateStatusParams = { paymentId: 'paymentId', clientCode: 'clientCode', _eTag: '_eTag' }
  const stubUpdateStatusParamsWithSession = {
    ...stubUpdateStatusParams,
    session: 'session',
  }
  const stubEmailBody = {
    receipientEmail: mockCardDetails.email,
    recipientName: `${mockCardDetails.customerFirstName} ${mockCardDetails.customerLastName}`,
    paymentReason: mockPaymentWithPropertyModel?.description,
    paymentAmount: mockPaymentWithPropertyModel?.amount,
    paymentCurrency: 'GBP',
  }
  const stubBody = { status: 'posted', externalReference: '' }
  it('it should call update session status and generate email correctly then refetch payment', async () => {
    const mockSetLoading = jest.fn()
    const errorSnack = jest.fn()
    await onUpdateStatus(
      stubBody,
      stubUpdateStatusParams,
      mockCardDetails,
      mockPaymentWithPropertyModel,
      mockSetLoading,
      errorSnack,
    )
    expect(updatePaymentStatus).toHaveBeenCalledWith(stubBody, stubUpdateStatusParams, errorSnack)
    expect(generateEmailPaymentReceiptInternal).toHaveBeenCalledWith(stubEmailBody, stubUpdateStatusParams, errorSnack)
    expect(mockSetLoading).toHaveBeenCalledWith('posted')
  })

  it('it should call update session status and generate email correctly then refetch payment with a session', async () => {
    const mockSetLoading = jest.fn()
    const errorSnack = jest.fn()
    await onUpdateStatus(
      stubBody,
      stubUpdateStatusParamsWithSession,
      mockCardDetails,
      mockPaymentWithPropertyModel,
      mockSetLoading,
      errorSnack,
    )
    expect(updatePaymentSessionStatus).toHaveBeenCalledWith(stubBody, stubUpdateStatusParamsWithSession, errorSnack)
    expect(generateEmailPaymentReceiptExternal).toHaveBeenCalledWith(
      stubEmailBody,
      stubUpdateStatusParamsWithSession,
      errorSnack,
    )
    expect(mockSetLoading).toHaveBeenCalledWith('posted')
  })
})

describe('onHandleSubmit', () => {
  window.sagepayOwnForm = jest.fn().mockReturnValue({ tokeniseCardDetails: jest.fn() })
  const onSubmit = onHandleSubmit(merchantKey, mockPaymentWithPropertyModel, paymentId, jest.fn(), jest.fn(), session)

  it('should correctly call the opayo method', () => {
    onSubmit(mockCardDetails)
    expect(window.sagepayOwnForm).toHaveBeenCalled()
  })
})

xdescribe('handleCreateTransaction', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should correctly call update', async () => {
    const updateSatusSpy = jest.spyOn(Handlers, 'onUpdateStatus')
    mockedFetch.mockReturnValueOnce(mockResponse)
    const onTokenised = handleCreateTransaction(
      merchantKey,
      mockPaymentWithPropertyModel,
      mockCardDetails,
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
      mockPaymentWithPropertyModel,
      mockCardDetails,
      paymentId,
      jest.fn(),
      jest.fn(),
      session,
    )
    await onTokenised({ success: false })
    expect(updateSatusSpy).toHaveBeenCalledTimes(1)
  })
})
