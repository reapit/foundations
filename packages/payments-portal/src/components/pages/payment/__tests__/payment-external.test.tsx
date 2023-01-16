import React from 'react'
import { usePaymentsState } from '../../../../core/use-payments-state'
import { mockPaymentsState } from '../../../../core/__mocks__/use-payments-state'
import { render } from '../../../../tests/react-testing'
import { mockPaymentWithPropertyModel } from '../../../../tests/__mocks__/payment'
import { handleSetPaymentWithProperty, PaymentExternalPage } from '../payment-external'

jest.mock('../../../../core/use-payments-state')
jest.mock('../../../../services/payment', () => ({
  getPaymentWithProperty: jest.fn(() => mockPaymentWithPropertyModel),
}))

const mockUsePaymentsState = usePaymentsState as jest.Mock

describe('PaymentExternalPage', () => {
  it('should match a snapshot when has a property', () => {
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no property', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentWithProperty: null,
      },
    })
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no provider and has a property', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentProvider: null,
      },
    })
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data and a merchantKey', () => {
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })
})

describe('handleSetPaymentWithProperty', () => {
  it('should correctly set payment with property', async () => {
    const setPaymentWithProperty = jest.fn()
    const setPaymentWithPropertyLoading = jest.fn()
    const paymentParams = { paymentId: 'MOCK_ID', clientId: 'MOCK_ID', session: 'MOCK_ID' }
    const errorSnack = jest.fn()
    const curried = handleSetPaymentWithProperty(
      setPaymentWithProperty,
      setPaymentWithPropertyLoading,
      paymentParams,
      errorSnack,
    )

    curried()

    await Promise.resolve()

    expect(setPaymentWithPropertyLoading).toHaveBeenCalledWith(true)
    expect(setPaymentWithProperty).toHaveBeenCalledWith({
      ...mockPaymentWithPropertyModel,
      clientCode: paymentParams.clientId,
    })
    expect(setPaymentWithPropertyLoading).toHaveBeenCalledWith(false)
  })
})
