import { Test, TestingModule } from '@nestjs/testing'
import { ClientConfigProvider } from '../provider'
import { ClientConfigPrivateController } from '../private-controller'
import { mockConfigCreateModel } from '../../tests/__mocks__/config'

const mockConfigProvider = {
  get: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}

describe('ClientConfigPrivateController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ClientConfigPrivateController],
      providers: [
        {
          provide: ClientConfigProvider,
          useValue: mockConfigProvider,
        },
      ],
    }).compile()
  })

  it('should get a config model', async () => {
    const controller = app.get<ClientConfigPrivateController>(ClientConfigPrivateController)

    mockConfigProvider.get.mockImplementationOnce(() => {
      return mockConfigCreateModel
    })

    const result = await controller.getConfig({
      'reapit-customer': 'SBOX',
      'reapit-id-token': 'MOCK_TOKEN',
    })

    expect(result).toEqual(mockConfigCreateModel)
  })

  it('should create a config model', async () => {
    const controller = app.get<ClientConfigPrivateController>(ClientConfigPrivateController)

    mockConfigProvider.create.mockImplementationOnce(() => {
      return mockConfigCreateModel
    })

    const result = await controller.createConfig(
      {
        'reapit-customer': 'SBOX',
        'reapit-id-token': 'MOCK_TOKEN',
      },
      mockConfigCreateModel,
    )

    expect(result).toEqual(mockConfigCreateModel)
  })

  it('should update a config model', async () => {
    const controller = app.get<ClientConfigPrivateController>(ClientConfigPrivateController)

    mockConfigProvider.update.mockImplementationOnce(() => {
      return mockConfigCreateModel
    })

    const result = await controller.updateConfig(
      {
        'reapit-customer': 'SBOX',
        'reapit-id-token': 'MOCK_TOKEN',
      },
      mockConfigCreateModel,
    )

    expect(result).toEqual(mockConfigCreateModel)
  })

  it('should delete a config model', async () => {
    const controller = app.get<ClientConfigPrivateController>(ClientConfigPrivateController)

    mockConfigProvider.delete.mockImplementationOnce(() => {
      return mockConfigCreateModel
    })

    const result = await controller.deleteConfig(
      {
        'reapit-customer': 'SBOX',
        'reapit-id-token': 'MOCK_TOKEN',
      },
      { configId: 'MOCK_ID' },
    )

    expect(result).toEqual(mockConfigCreateModel)
  })
})
