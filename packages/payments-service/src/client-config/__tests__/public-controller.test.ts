import { Test, TestingModule } from '@nestjs/testing'
import { ClientConfigProvider } from '../provider'
import { ClientConfigPublicController } from '../public-controller'
import { mockConfigModel } from '../../tests/__mocks__/config'
import { ClientConfigPublicHeaders } from '../dto'
import { SessionGuard } from '../../session/session-guard'

const mockConfigProvider = {
  get: jest.fn(),
}

describe('ClientConfigPublicController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ClientConfigPublicController],
      providers: [
        {
          provide: ClientConfigProvider,
          useValue: mockConfigProvider,
        },
      ],
    })
      .overrideGuard(SessionGuard)
      .useValue(true)
      .compile()
  })

  it('should get a config model', async () => {
    const controller = app.get<ClientConfigPublicController>(ClientConfigPublicController)

    mockConfigProvider.get.mockImplementationOnce(() => {
      return mockConfigModel
    })

    const result = await controller.getConfig({
      'reapit-customer': 'SBOX',
    } as ClientConfigPublicHeaders)

    expect(result).toEqual(mockConfigModel)
  })
})
