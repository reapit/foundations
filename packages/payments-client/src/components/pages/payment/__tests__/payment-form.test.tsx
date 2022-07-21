import React from 'react'
import { usePaymentsState } from '../../../../core/use-payments-state'
import { mockPaymentsState } from '../../../../core/__mocks__/use-payments-state'
import { render } from '../../../../tests/react-testing'
import { mockPaymentWithPropertyModel } from '../../../../tests/__mocks__/payment'
import { PaymentForm } from '../payment-form'

jest.mock('../../../../core/use-payments-state')

const mockUsePaymentsState = usePaymentsState as jest.Mock

describe('PaymentForm', () => {
  it('should match a snapshot when payment is pending', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentWithProperty: {
          ...mockPaymentWithPropertyModel,
          status: 'pending',
        },
      },
    })
    expect(render(<PaymentForm />)).toMatchSnapshot()
  })
  it('should match a snapshot when payment is rejected', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentWithProperty: {
          ...mockPaymentWithPropertyModel,
          status: 'rejected',
        },
      },
    })
    expect(render(<PaymentForm />)).toMatchSnapshot()
  })

  it('should match a snapshot when payment is posted', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentWithProperty: {
          ...mockPaymentWithPropertyModel,
          status: 'posted',
        },
      },
    })
    expect(render(<PaymentForm />)).toMatchSnapshot()
  })

  it('should match a snapshot when payment is loading', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentWithProperty: {
          ...mockPaymentWithPropertyModel,
          status: 'loading',
        },
      },
    })
    expect(render(<PaymentForm />)).toMatchSnapshot()
  })

  it('should match a snapshot when payment is awaitingPosting', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentWithProperty: {
          ...mockPaymentWithPropertyModel,
          status: 'awaitingPosting',
        },
      },
    })
    expect(render(<PaymentForm />)).toMatchSnapshot()
  })
})
