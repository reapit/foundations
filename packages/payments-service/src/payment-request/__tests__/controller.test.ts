import { Test, TestingModule } from '@nestjs/testing'
import { PaymentRequestProvider } from '../provider'
import { PaymentRequestController } from '../controller'
import { PaymentRequestDto } from '../dto'

const mockPaymentRequestProvider = {
  create: jest.fn(),
}

describe('PaymentRequestController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PaymentRequestController],
      providers: [
        {
          provide: PaymentRequestProvider,
          useValue: mockPaymentRequestProvider,
        },
      ],
    }).compile()
  })

  it('should create a payment request', async () => {
    const controller = app.get<PaymentRequestController>(PaymentRequestController)

    mockPaymentRequestProvider.create.mockImplementationOnce(() => {
      return 'Success'
    })

    const result = await controller.createRequest(
      {
        'reapit-customer': 'SBOX',
        'reapit-session': 'MOCK_SESSION',
      },
      {
        paymentId: 'MOCK_PAYMENT_ID',
      },
      {} as PaymentRequestDto,
    )

    expect(result).toEqual('Success')
  })
})
