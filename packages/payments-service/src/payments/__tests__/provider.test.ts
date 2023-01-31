import { Test, TestingModule } from '@nestjs/testing'
import { PaymentsProvider } from '../provider'
import axios from 'axios'
import {
  mockPaymentModel,
  mockPaymentsHeaders,
  mockPaymentUpdate,
  mockPaymentWithPropertyModel,
} from '../../tests/__mocks__/payment'
import { mockPropertyModel } from '../../tests/__mocks__/property'

jest.mock('axios')
jest.mock('../../core/connect-session', () => ({
  connectAccessToken: jest.fn(() => 'MOCK_TOKEN'),
}))

const mockAxiosGet = axios.get as jest.Mock
const mockAxiosPatch = axios.patch as jest.Mock

describe('PaymentsProvider', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PaymentsProvider],
    }).compile()
  })

  it('should correctly get a payment with property', async () => {
    const provider = app.get<PaymentsProvider>(PaymentsProvider)

    mockAxiosGet
      .mockReturnValueOnce({ data: mockPaymentModel, status: 200 })
      .mockReturnValueOnce({ data: mockPropertyModel, status: 200 })

    const result = await provider.getPayment(mockPaymentsHeaders, 'MOCK_PAYMENT_ID')

    expect(result).toEqual(mockPaymentWithPropertyModel)
  })

  it('should correctly update a property', async () => {
    const provider = app.get<PaymentsProvider>(PaymentsProvider)

    mockAxiosPatch.mockReturnValueOnce({ data: mockPaymentModel, status: 204 })

    const result = await provider.patchPayment(mockPaymentsHeaders, mockPaymentUpdate, 'MOCK_PAYMENT_ID')

    expect(result).toEqual({
      message: 'Payment updated successfully',
      status: 204,
    })
  })
})
