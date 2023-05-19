import { resolveApiKey } from '../../api-key'
import { TestingModule, Test } from '@nestjs/testing'
import { createApiKeyInvokeConfigProvide } from '../api.key.invoke.config'
import { ApiKeyProvider } from './../api.key.provider'
import { AuthModule, IdTokenGuard } from '@reapit/utils-nest'
import { IdTokenProvider } from '@reapit/utils-nest/src/auth/id-token-provider'

jest.mock('../../api-key', () => ({
  resolveApiKey: jest.fn(() => {
    return {}
  }),
}))

describe('ApiKeyProvider', () => {
  describe('Provider', () => {
    let module: TestingModule

    beforeAll(async () => {
      module = await Test.createTestingModule({
        providers: [
          ApiKeyProvider,
          createApiKeyInvokeConfigProvide({
            apiKeyInvoke: {
              enabled: true,
              invokeArn: '',
            },
          }),
        ],
      }).compile()
    })

    it('Will call resolveApiKey', async () => {
      const provider = module.get(ApiKeyProvider)

      await provider.resolve({ headers: { 'x-api-key': 'some-key' } })

      expect(resolveApiKey).toHaveBeenCalled()
    })
  })

  describe('Within AuthModule', () => {
    let module: TestingModule
    const apiKeyProvider = new ApiKeyProvider({ apiKeyInvoke: { enabled: true, invokeArn: '' } })
    const tokenProvider = new IdTokenProvider()

    beforeAll(async () => {
      // @ts-ignore
      apiKeyProvider.resolve = jest.fn(() => ({}))
      // @ts-ignore
      tokenProvider.resolve = jest.fn(() => ({}))

      module = await Test.createTestingModule({
        imports: [AuthModule],
        providers: [ApiKeyProvider],
      })
        .overrideProvider(ApiKeyProvider)
        .useValue(apiKeyProvider)
        .overrideProvider(IdTokenProvider)
        .useValue(tokenProvider)
        .compile()

      await module.init()
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    it('Expect ApiKeyProvider to be invoked when x-api-key exists', async () => {
      const provider = module.get(IdTokenGuard)

      await provider.canActivate({
        // @ts-ignore
        switchToHttp: () => ({
          // @ts-ignore
          getRequest: () => {
            return {
              headers: { 'x-api-key': 'some-api-key' },
            }
          },
        }),
      })

      expect(apiKeyProvider.resolve).toHaveBeenCalled()
    })

    it('Expect ApiKeyProvider not not have been called when x-api-key does not exist', async () => {
      const provider = module.get(IdTokenGuard)

      await provider.canActivate({
        // @ts-ignore
        switchToHttp: () => ({
          // @ts-ignore
          getRequest: () => {
            return {
              headers: {},
            }
          },
        }),
      })

      expect(apiKeyProvider.resolve).not.toHaveBeenCalled()
      expect(tokenProvider.resolve).toHaveBeenCalled()
    })
  })
})
