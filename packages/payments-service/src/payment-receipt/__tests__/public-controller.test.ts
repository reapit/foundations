import { Test, TestingModule } from '@nestjs/testing'
import { PaymentReceiptProvider } from '../provider'
import { PaymentReceiptPublicController } from '../public-controller'
import { SessionGuard } from '../../session/session-guard'
import { mockPaymentReceipt } from '../../tests/__mocks__/receipt'

const mockPaymentReceiptProvider = {
  createReceipt: jest.fn(),
}

describe('PaymentReceiptPublicController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PaymentReceiptPublicController],
      providers: [
        {
          provide: PaymentReceiptProvider,
          useValue: mockPaymentReceiptProvider,
        },
      ],
    })
      .overrideGuard(SessionGuard)
      .useValue(true)
      .compile()
  })

  it('should create a receipt', async () => {
    const controller = app.get<PaymentReceiptPublicController>(PaymentReceiptPublicController)

    mockPaymentReceiptProvider.createReceipt.mockImplementationOnce(() => {
      return
    })

    const result = await controller.createReceiptPublic(
      {
        'reapit-customer': 'SBOX',
      },
      mockPaymentReceipt,
    )

    expect(result).toBeUndefined()
  })
})
