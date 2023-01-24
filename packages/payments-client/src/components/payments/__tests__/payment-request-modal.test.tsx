import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockPaymentModel } from '../../../tests/__mocks__/payment'
import { handlePaymentRequestSubmit, PaymentEmailRequestModel, PaymentRequestModal } from '../payment-request-modal'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitUpdate: jest.fn(() => [null, false]),
}))

describe('PaymentRequestModal', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <PaymentRequestModal
        refreshPayments={jest.fn()}
        closeModal={jest.fn()}
        selectedPayment={mockPaymentModel}
        setSelectedPayment={jest.fn()}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handlePaymentRequestSubmit', () => {
  it('should correctly call email service', async () => {
    const selectedPayment = mockPaymentModel
    const setSelectedPayment = jest.fn()
    const closeModal = jest.fn()
    const updatePayment = jest.fn(() => Promise.resolve(true))
    const generateSession = jest.fn(() => Promise.resolve(true))
    const generatePaymentRequest = jest.fn(() => Promise.resolve(true))
    const refreshPayments = jest.fn()
    const clientCode = 'MOCK_CODE'

    const curried = handlePaymentRequestSubmit({
      selectedPayment,
      setSelectedPayment,
      closeModal,
      updatePayment,
      generateSession,
      generatePaymentRequest,
      refreshPayments,
      clientCode,
    })

    await curried({ sessionExpiresAt: '2030-01-01' } as PaymentEmailRequestModel)

    expect(refreshPayments).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(generateSession).toHaveBeenCalledWith({
      clientCode,
      sessionExpiresAt: '2030-01-01T00:00:00+00:00',
      paymentId: mockPaymentModel.id,
    })
    expect(setSelectedPayment).toHaveBeenCalledWith(null)
  })
})
