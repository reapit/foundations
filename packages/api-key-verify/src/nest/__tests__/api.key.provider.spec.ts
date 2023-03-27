import { TestingModule, Test } from '@nestjs/testing'
import { createApiKeyInvokeConfigProvide } from '../api.key.invoke.config'
import { ApiKeyProvider } from '../api.key.provider'

describe('ApiKeyProvider', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        createApiKeyInvokeConfigProvide({
          apiKeyInvoke: {
            enabled: true,
            invokeArn: '',
          }
        }),
        ApiKeyProvider,
      ],
    }).compile()

    module.init()
  })

  it('Will call resolveApiKey', async () => {
    const mockResolveApiKey = jest.fn()
    jest.mock('../../api-key.ts', () => ({
      resolveApiKey: mockResolveApiKey,
    }))

    const provider = module.get(ApiKeyProvider)

    await provider.resolve({
      headers: {
        'x-api-key': 'someApiKey',
      },
    })

    expect(mockResolveApiKey).toHaveBeenCalled()
  })
})
