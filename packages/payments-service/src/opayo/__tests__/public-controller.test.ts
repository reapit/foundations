import { Test, TestingModule } from '@nestjs/testing'
import { OpayoProvider } from '../provider'
import { OpayoPublicController } from '../public-controller'
import { TransactionDto } from '../dto'
import { SessionGuard } from '../../session/session-guard'

const mockOpayoProvider = {
  createTransaction: jest.fn(),
  createMerchantKeys: jest.fn(),
}

describe('OpayoPublicController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [OpayoPublicController],
      providers: [
        {
          provide: OpayoProvider,
          useValue: mockOpayoProvider,
        },
      ],
    })
      .overrideGuard(SessionGuard)
      .useValue(true)
      .compile()
  })

  it('should create a transaction', async () => {
    const controller = app.get<OpayoPublicController>(OpayoPublicController)

    mockOpayoProvider.createTransaction.mockImplementationOnce(() => {
      return 'Success'
    })

    const result = await controller.createTransaction(
      {
        'reapit-customer': 'SBOX',
        'reapit-session': 'MOCK_SESSION',
        'x-forwarded-for': 'https://example.com',
      },
      {} as unknown as TransactionDto,
    )

    expect(result).toEqual('Success')
  })

  it('should create a merchant key', async () => {
    const controller = app.get<OpayoPublicController>(OpayoPublicController)

    mockOpayoProvider.createMerchantKeys.mockImplementationOnce(() => {
      return 'Success'
    })

    const result = await controller.createMerchantKeys({
      'reapit-customer': 'SBOX',
      'reapit-session': 'MOCK_SESSION',
      'x-forwarded-for': 'https://example.com',
    })

    expect(result).toEqual('Success')
  })
})
