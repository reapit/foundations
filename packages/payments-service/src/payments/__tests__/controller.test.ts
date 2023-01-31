import { Test, TestingModule } from '@nestjs/testing'
import { PaymentsProvider } from '../provider'
import { PaymentsController } from '../controller'
import { SessionGuard } from '../../session/session-guard'
import { mockPaymentsHeaders, mockPaymentUpdate, mockPaymentWithPropertyModel } from '../../tests/__mocks__/payment'

const mockPaymentsProvider = {
  getPayment: jest.fn(),
  patchPayment: jest.fn(),
}

describe('PaymentsController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsProvider,
          useValue: mockPaymentsProvider,
        },
      ],
    })
      .overrideGuard(SessionGuard)
      .useValue(true)
      .compile()
  })

  it('should get a payment', async () => {
    const controller = app.get<PaymentsController>(PaymentsController)

    mockPaymentsProvider.getPayment.mockImplementationOnce(() => {
      return mockPaymentWithPropertyModel
    })

    const result = await controller.getPayment(mockPaymentsHeaders, { paymentId: 'MOCK_PAYMENT_ID' })

    expect(result).toEqual(mockPaymentWithPropertyModel)
  })

  it('should patch a payment', async () => {
    const controller = app.get<PaymentsController>(PaymentsController)

    mockPaymentsProvider.patchPayment.mockImplementationOnce(() => {
      return mockPaymentWithPropertyModel
    })

    const result = await controller.patchPayment(mockPaymentsHeaders, mockPaymentUpdate, {
      paymentId: 'MOCK_PAYMENT_ID',
    })

    expect(result).toEqual(mockPaymentWithPropertyModel)
  })
})
