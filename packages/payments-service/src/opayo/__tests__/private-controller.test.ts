import { Test, TestingModule } from '@nestjs/testing'
import { OpayoProvider } from '../provider'
import { OpayoPrivateController } from '../private-controller'
import { TransactionDto } from '../dto'

const mockOpayoProvider = {
  createTransaction: jest.fn(),
  createMerchantKeys: jest.fn(),
}

describe('OpayoPrivateController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [OpayoPrivateController],
      providers: [
        {
          provide: OpayoProvider,
          useValue: mockOpayoProvider,
        },
      ],
    }).compile()
  })

  it('should create a transaction', async () => {
    const controller = app.get<OpayoPrivateController>(OpayoPrivateController)

    mockOpayoProvider.createTransaction.mockImplementationOnce(() => {
      return 'Success'
    })

    const result = await controller.createTransaction(
      {
        'reapit-customer': 'SBOX',
      },
      {} as unknown as TransactionDto,
    )

    expect(result).toEqual('Success')
  })

  it('should create a merchant key', async () => {
    const controller = app.get<OpayoPrivateController>(OpayoPrivateController)

    mockOpayoProvider.createMerchantKeys.mockImplementationOnce(() => {
      return 'Success'
    })

    const result = await controller.createMerchantKeys({
      'reapit-customer': 'SBOX',
    })

    expect(result).toEqual('Success')
  })
})
