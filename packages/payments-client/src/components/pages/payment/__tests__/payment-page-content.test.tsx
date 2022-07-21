import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockPaymentModel } from '../../../../tests/__mocks__/payment'
import { handleOpenModal, PaymentPageContent } from '../payment-page-content'

jest.mock('../../../../core/use-payments-state')

describe('PaymentPageContent', () => {
  it('should match a snapshot when has a session', () => {
    expect(render(<PaymentPageContent />)).toMatchSnapshot()
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
