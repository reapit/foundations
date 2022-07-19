import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { PaymentRequestModal } from '../payment-request-modal'
// import { mockPaymentModel } from '../../../../tests/__mocks__/payment'

describe('PaymentRequestModal', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PaymentRequestModal refreshPayments={jest.fn()} closeModal={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

// describe('handlePaymentRequestSubmit', () => {
//   it('should correctly call email service', async () => {
//     mockedFetch.mockReturnValueOnce(mockResponse)
//     const mockSetLoading = jest.fn()
//     const mockHandleOnClose = jest.fn()
//     const curried = handlePaymentRequestSubmit(mockSetLoading, mockHandleOnClose)
//     await curried({ keyExpiresAt: new Date('2030-01-01') } as PaymentEmailRequestModel)
//     // expect(generatePaymentApiKey).toHaveBeenCalledTimes(1)
//   })
// })
