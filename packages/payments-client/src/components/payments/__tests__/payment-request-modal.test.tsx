// import React from 'react'
// import { render } from '../../../tests/react-testing'
// import { mockPaymentWithPropertyModel } from '../../../tests/__mocks__/payment'
// import { handlePaymentRequestSubmit, PaymentEmailRequestModel, PaymentRequestModal } from '../payment-request-modal'

// jest.mock('../../../../core/use-payments-state')

// jest.mock('../../../../services/payment', () => ({
//   generateEmailPaymentRequest: jest.fn(() => true),
//   generatePaymentApiKey: jest.fn(() => true),
//   updatePaymentStatus: jest.fn(() => true),
// }))

// describe('PaymentRequestModal', () => {
//   it('should match a snapshot', () => {
//     const wrapper = render(<PaymentRequestModal refreshPayments={jest.fn()} closeModal={jest.fn()} />)
//     expect(wrapper).toMatchSnapshot()
//   })
// })

// describe('handlePaymentRequestSubmit', () => {
//   it('should correctly call email service', async () => {
//     const setSelectedPayment = jest.fn()
//     const closeModal = jest.fn()
//     const setLoading = jest.fn()
//     const errorSnack = jest.fn()
//     const refreshPayments = jest.fn()
//     const clientCode = 'MOCK_CODE'

//     const curried = handlePaymentRequestSubmit(
//       mockPaymentWithPropertyModel,
//       setSelectedPayment,
//       closeModal,
//       setLoading,
//       errorSnack,
//       refreshPayments,
//       clientCode,
//     )

//     await curried({ keyExpiresAt: '2030-01-01' } as PaymentEmailRequestModel)

//     expect(setLoading).toHaveBeenCalledWith(true)
//     expect(refreshPayments).toHaveBeenCalledTimes(1)
//     expect(closeModal).toHaveBeenCalledTimes(1)
//     expect(setSelectedPayment).toHaveBeenCalledWith(null)
//     expect(setLoading).toHaveBeenCalledWith(false)
//   })
// })
