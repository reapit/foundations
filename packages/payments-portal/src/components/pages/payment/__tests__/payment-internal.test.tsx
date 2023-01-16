import React from 'react'
import { render } from '../../../../tests/react-testing'
import { handleSetPaymentWithProperty, PaymentInternalPage } from '../payment-internal'
import { mockPaymentModel } from '../../../../tests/__mocks__/payment'
import { mockPropertyModel } from '../../../../tests/__mocks__/property'
import { useReapitGet } from '@reapit/utils-react'
import { usePaymentsState } from '../../../../core/use-payments-state'
import { mockPaymentsState } from '../../../../core/__mocks__/use-payments-state'

jest.mock('../../../../core/use-payments-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock
const mockUsePaymentsState = usePaymentsState as jest.Mock

describe('PaymentInternalPage', () => {
  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])
    expect(render(<PaymentInternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no provider', () => {
    mockUsePaymentsState.mockReturnValueOnce({
      ...mockPaymentsState,
      paymentsDataState: {
        ...mockPaymentsState.paymentsDataState,
        paymentProvider: null,
      },
    })
    expect(render(<PaymentInternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data', () => {
    mockUseReapitGet.mockReturnValueOnce([mockPropertyModel, false]).mockReturnValueOnce([mockPaymentModel, false])
    expect(render(<PaymentInternalPage />)).toMatchSnapshot()
  })
})

describe('handleSetPaymentWithProperty', () => {
  it('should correctly set payment with property', () => {
    const setPaymentWithProperty = jest.fn()
    const clientId = 'MOCK_ID'
    const curried = handleSetPaymentWithProperty(setPaymentWithProperty, mockPaymentModel, mockPropertyModel, clientId)

    curried()

    expect(setPaymentWithProperty).toHaveBeenCalledWith({
      ...mockPaymentModel,
      property: mockPropertyModel,
      clientCode: clientId,
    })
  })
})
