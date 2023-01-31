import { Test, TestingModule } from '@nestjs/testing'
import { SessionProvider } from '../provider'
import { mockSession } from '../../tests/__mocks__/session'
import { DataMapper } from '@aws/dynamodb-data-mapper'

const mockDataMapper = {
  put: jest.fn(),
}

describe('SessionProvider', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [SessionProvider, { provide: DataMapper, useValue: mockDataMapper }],
    }).compile()
  })

  it('should correctly create a session', async () => {
    const provider = app.get<SessionProvider>(SessionProvider)

    mockDataMapper.put.mockImplementationOnce(() => {
      return mockSession
    })

    const result = await provider.create(mockSession)

    expect(result).toEqual(mockSession)
  })
})
