import React from 'react'
import { useReapitGet } from '@reapit/utils-react'
import { usePaymentsState } from '../../../../core/use-payments-state'
import { mockPaymentsState } from '../../../../core/__mocks__/use-payments-state'
import { render } from '../../../../tests/react-testing'
import { mockPaymentWithPropertyModel } from '../../../../tests/__mocks__/payment'
import { handleSetPaymentWithProperty, PaymentExternalPage } from '../payment-external'

jest.mock('../../../../core/use-payments-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockPaymentWithPropertyModel, false]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock
const mockUsePaymentsState = usePaymentsState as jest.Mock

describe('PaymentExternalPage', () => {
  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])
    expect(render(<PaymentExternalPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has no property', () => {
    mockUseReapitGet.mockReturnValueOnce([null, false])
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
  it('should correctly set payment with property', () => {
    const setPaymentWithProperty = jest.fn()
    const clientId = 'MOCK_ID'
    const curried = handleSetPaymentWithProperty(setPaymentWithProperty, mockPaymentWithPropertyModel, clientId)

    curried()

    expect(setPaymentWithProperty).toHaveBeenCalledWith({
      ...mockPaymentWithPropertyModel,
      clientCode: clientId,
    })
  })
})
