import { Test, TestingModule } from '@nestjs/testing'
import { ClientConfigProvider } from '../provider'
import { mockConfigModel } from '../../tests/__mocks__/config'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { BadRequestException, NotFoundException } from '@nestjs/common'

const mockDataMapper = {
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
}

describe('ClientConfigProvider', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [ClientConfigProvider, { provide: DataMapper, useValue: mockDataMapper }],
    }).compile()
  })

  it('should get a config model from the db', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    mockDataMapper.get.mockImplementationOnce(() => {
      return mockConfigModel
    })

    const result = await provider.get('SBOX')

    expect(result).toEqual(mockConfigModel)
  })

  it('should throw if the config model is not found', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    try {
      mockDataMapper.get.mockImplementationOnce(() => {
        throw new Error()
      })

      const result = await provider.get('SBOX')

      expect(result).toBeUndefined()
    } catch (err) {
      expect(err instanceof NotFoundException).toBe(true)
    }
  })

  it('should create a config model in the db', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    mockDataMapper.put.mockImplementationOnce(() => {
      return mockConfigModel
    })

    const result = await provider.create('SBOX', mockConfigModel)

    expect(result).toEqual(mockConfigModel)
  })

  it('should throw if the config model is not created', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    try {
      mockDataMapper.put.mockImplementationOnce(() => {
        throw new Error()
      })

      const result = await provider.create('SBOX', mockConfigModel)

      expect(result).toBeUndefined()
    } catch (err) {
      expect(err instanceof BadRequestException).toBe(true)
    }
  })

  it('should update a config model in the db', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    mockDataMapper.update.mockImplementationOnce(() => {
      return mockConfigModel
    })

    const result = await provider.update('SBOX', mockConfigModel)

    expect(result).toEqual(mockConfigModel)
  })

  it('should throw if the config model is not updated', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    try {
      mockDataMapper.update.mockImplementationOnce(() => {
        throw new Error()
      })

      const result = await provider.update('SBOX', mockConfigModel)

      expect(result).toBeUndefined()
    } catch (err) {
      expect(err instanceof BadRequestException).toBe(true)
    }
  })

  it('should delete a config model in the db', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    mockDataMapper.delete.mockImplementationOnce(() => {
      return true
    })

    const result = await provider.delete('SBOX')

    expect(result).toBe(true)
  })

  it('should throw if the config model is not deleted', async () => {
    const provider = app.get<ClientConfigProvider>(ClientConfigProvider)

    try {
      mockDataMapper.delete.mockImplementationOnce(() => {
        throw new Error()
      })

      const result = await provider.delete('SBOX')

      expect(result).toBeUndefined()
    } catch (err) {
      expect(err instanceof BadRequestException).toBe(true)
    }
  })
})
