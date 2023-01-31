import { Test, TestingModule } from '@nestjs/testing'
import { SessionProvider } from '../provider'
import { SessionController } from '../controller'
import { mockSession } from '../../tests/__mocks__/session'

const mockSessionProvider = {
  create: jest.fn(),
}

describe('SessionController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        {
          provide: SessionProvider,
          useValue: mockSessionProvider,
        },
      ],
    }).compile()
  })

  it('should create a session', async () => {
    const controller = app.get<SessionController>(SessionController)

    mockSessionProvider.create.mockImplementationOnce(() => {
      return mockSession
    })

    const result = await controller.createSession(mockSession)

    expect(result).toEqual(mockSession)
  })
})
