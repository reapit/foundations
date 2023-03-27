import { TestingModule, Test } from '@nestjs/testing'
import { createApiKeyInvokeConfigProvide } from './api.key.invoke.config'
import { ApiKeyProvider } from './api.key.provider'

const resolveApiKey = jest.fn()

jest.mock('../api-key', () => ({
  resolveApiKey,
}))

describe('ApiKeyProvider', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ApiKeyProvider, createApiKeyInvokeConfigProvide({
        apiKeyInvoke: {
          enabled: true,
          invokeArn: '',
        },
      })],
    }).compile()

    await module.init()
  })

  it('Will call resolveApiKey', async () => {
    const provider = module.get(ApiKeyProvider)

    await provider.resolve({ 'xapi-key': 'some-key'})

    expect(resolveApiKey).toHaveBeenCalled()
  })
})
