import { Test, TestingModule } from '@nestjs/testing'
import { ClientConfigProvider } from '../provider'
import { ClientConfigPrivateController } from '../private-controller'
import { mockConfigModel } from '../../tests/__mocks__/config'

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
      return mockConfigModel
    })

    const result = await controller.getConfig({
      clientCode: 'SBOX',
    })

    expect(result).toEqual(mockConfigModel)
  })

  it('should create a config model', async () => {
    const controller = app.get<ClientConfigPrivateController>(ClientConfigPrivateController)

    mockConfigProvider.create.mockImplementationOnce(() => {
      return mockConfigModel
    })

    const result = await controller.createConfig(
      {
        clientCode: 'SBOX',
      },
      mockConfigModel,
    )

    expect(result).toEqual(mockConfigModel)
  })

  it('should update a config model', async () => {
    const controller = app.get<ClientConfigPrivateController>(ClientConfigPrivateController)

    mockConfigProvider.update.mockImplementationOnce(() => {
      return mockConfigModel
    })

    const result = await controller.updateConfig(
      {
        clientCode: 'SBOX',
      },
      mockConfigModel,
    )

    expect(result).toEqual(mockConfigModel)
  })

  it('should delete a config model', async () => {
    const controller = app.get<ClientConfigPrivateController>(ClientConfigPrivateController)

    mockConfigProvider.delete.mockImplementationOnce(() => {
      return mockConfigModel
    })

    const result = await controller.deleteConfig({
      clientCode: 'SBOX',
    })

    expect(result).toEqual(mockConfigModel)
  })
})
