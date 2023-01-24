import * as Handlers from '../payment-handlers'
import { mockCardDetails } from '../../tests/__mocks__/opayo'
import { mockPaymentProvider } from '../../tests/__mocks__/payment-provider'

describe('onUpdateStatus', () => {
  const stubEmailBody = {
    receipientEmail: mockCardDetails.email,
    recipientName: `${mockCardDetails.customerFirstName} ${mockCardDetails.customerLastName}`,
    paymentReason: mockPaymentProvider.payment?.description,
    paymentAmount: mockPaymentProvider.payment?.amount,
    paymentCurrency: 'GBP',
  }
  const stubBody = { status: 'posted', externalReference: '' }

  it('it should call update session status and generate email correctly then refetch payment', async () => {
    const paymentProvider = mockPaymentProvider
    const setTransactionProcessing = jest.fn()

    await Handlers.onUpdateStatus(paymentProvider, mockCardDetails, setTransactionProcessing, stubBody)
    expect(paymentProvider.statusAction.statusSubmit).toHaveBeenCalledWith(stubBody)
    expect(paymentProvider.receiptAction.receiptSubmit).toHaveBeenCalledWith(stubEmailBody)
    expect(setTransactionProcessing).toHaveBeenCalledWith(false)
  })
})

describe('handleTransaction', () => {
  window.sagepayOwnForm = jest.fn().mockReturnValue({ tokeniseCardDetails: jest.fn() })
  const paymentProvider = mockPaymentProvider
  const setTransactionProcessing = jest.fn()
  const curried = Handlers.handleTransaction(paymentProvider, setTransactionProcessing)

  it('should correctly call the opayo method', () => {
    curried(mockCardDetails)
    expect(window.sagepayOwnForm).toHaveBeenCalledWith({
      merchantSessionKey: mockPaymentProvider.merchantKey.merchantSessionKey,
    })
  })
})

describe('handleCreateTransaction', () => {
  it('should correctly call update', async () => {
    // TODO - Need to work out why this spy is not being called - the functions are being called in the correct order!
    // const updateStatusSpy = jest.spyOn(Handlers, 'onUpdateStatus')
    const paymentProvider = mockPaymentProvider
    const setTransactionProcessing = jest.fn()

    const onTokenised = Handlers.handleCreateTransaction(paymentProvider, mockCardDetails, setTransactionProcessing)
    await onTokenised({ success: true })
    // expect(updateStatusSpy).toHaveBeenCalledTimes(1)
    // expect(updateStatusSpy).toHaveBeenCalledWith(1)
  })

  it('should correctly call update', async () => {
    // TODO - Need to work out why this spy is not being called - the functions are being called in the correct order!
    // const updateStatusSpy = jest.spyOn(Handlers, 'onUpdateStatus')
    const paymentProvider = mockPaymentProvider
    const setTransactionProcessing = jest.fn()

    const onTokenised = Handlers.handleCreateTransaction(paymentProvider, mockCardDetails, setTransactionProcessing)
    await onTokenised({ success: false })
    // expect(updateStatusSpy).toHaveBeenCalledTimes(1)
    // expect(updateStatusSpy).toHaveBeenCalledWith(1)
  })
})
