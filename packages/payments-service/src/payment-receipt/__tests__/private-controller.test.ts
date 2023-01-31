import { Test, TestingModule } from '@nestjs/testing'
import { PaymentReceiptProvider } from '../provider'
import { PaymentReceiptPrivateController } from '../private-controller'
import { mockPaymentReceipt } from '../../tests/__mocks__/receipt'

const mockPaymentReceiptProvider = {
  createReceipt: jest.fn(),
}

describe('PaymentReceiptPrivateController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PaymentReceiptPrivateController],
      providers: [
        {
          provide: PaymentReceiptProvider,
          useValue: mockPaymentReceiptProvider,
        },
      ],
    }).compile()
  })

  it('should create a receipt', async () => {
    const controller = app.get<PaymentReceiptPrivateController>(PaymentReceiptPrivateController)

    mockPaymentReceiptProvider.createReceipt.mockImplementationOnce(() => {
      return 'Success'
    })

    const result = await controller.createReceiptPrivate(
      {
        'reapit-customer': 'SBOX',
        'reapit-session': 'MOCK_SESSION',
      },
      mockPaymentReceipt,
    )

    expect(result).toEqual('Success')
  })
})
