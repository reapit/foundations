import { Test } from '@nestjs/testing'
import { AccessTokenGuard } from '../access-token-guard'
import { AccessTokenProvider } from '../access-token-provider'
import { CredentialsRequestAppendProvider } from '../credentials-request-append-provider'

describe('AccessTokenGuard', () => {
  let guard: AccessTokenGuard
  const accessTokenProvider = new AccessTokenProvider({
    env: 'dev',
  })
  beforeAll(async () => {
    accessTokenProvider.fetchIdentity = jest.fn()

    const module = await Test.createTestingModule({
      providers: [AccessTokenGuard, AccessTokenProvider, CredentialsRequestAppendProvider],
    })
      .overrideProvider(AccessTokenProvider)
      .useValue(accessTokenProvider)
      .compile()

    await module.init()

    guard = module.get<AccessTokenGuard>(AccessTokenGuard)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Can successfully approve request', async () => {
    ;(accessTokenProvider.fetchIdentity as jest.Mock).mockImplementationOnce(() => true)

    try {
      const result = await guard.canActivate({
        // @ts-ignore
        switchToHttp: () => ({
          // @ts-ignore
          getRequest: () => {
            return {
              headers: { authorization: 'Bearer some-access-token' },
            }
          },
        }),
      })

      expect(result).toBeTruthy()
    } catch (e) {
      expect(true).toBeFalsy() // fail if execptioned
    }
  })
})
