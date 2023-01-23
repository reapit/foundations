import React from 'react'
import { render } from '../../tests/react-testing'
import { mockPaymentModel } from '../../tests/__mocks__/payment'
import { handleOpenModal, PaymentPageContent } from '..'
import { mockPaymentProvider } from '../../tests/__mocks__/payment-provider'

describe('PaymentPageContent', () => {
  it('should match a snapshot when has a session', () => {
    expect(render(<PaymentPageContent paymentProvider={mockPaymentProvider} />)).toMatchSnapshot()
  })
})

describe('handleOpenModal', () => {
  it('should correctly open the modal and set a payment', () => {
    const setSelectedPayment = jest.fn()
    const openModal = jest.fn()

    const curried = handleOpenModal(openModal, setSelectedPayment, mockPaymentModel)

    curried()

    expect(setSelectedPayment).toHaveBeenCalledWith(mockPaymentModel)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})
