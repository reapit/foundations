import { AuthProviderInterface } from '../../auth-provider-interface'
import { TokenProvider } from '../../token-provider'
import { Test, TestingModule } from '@nestjs/testing'
import { CredGuard } from '../cred-guard'
import { CredAuthTokenProvider } from '../../token.provider.decorator'
import { Module } from '@nestjs/common'

describe('CredGuard', () => {
  describe('Module Init', () => {
    it('Cred Guard will find all AuthProviders', async () => {
      @CredAuthTokenProvider(2)
      class TestProvider implements AuthProviderInterface<{}> {
        type() {
          return 'test'
        }

        applies() {
          return true
        }

        async resolve() {
          return {}
        }
      }

      @CredAuthTokenProvider(2)
      class AnotherTestProvider extends TestProvider {
        type() {
          return 'anotherTest'
        }
      }

      class TestCredGuard extends CredGuard {
        getAuthProviders() {
          return this.authProviders
        }
      }

      const module = await Test.createTestingModule({
        providers: [TestProvider, AnotherTestProvider, TestCredGuard, TokenProvider],
      }).compile()

      await module.init()

      const provider = module.get(TestCredGuard)

      provider.getAuthProviders().forEach((inst) => {
        expect(['TestProvider', 'AnotherTestProvider', 'TokenProvider'].includes(inst.constructor.name)).toBeTruthy()
      })
    })

    it('CredGuard will find all AuthProviders in different modules', async () => {
      @CredAuthTokenProvider(2)
      class TestProvider implements AuthProviderInterface<any> {
        type() {
          return 'test'
        }

        applies() {
          return true
        }

        async resolve() {
          return {}
        }
      }

      @Module({
        providers: [TestProvider],
      })
      class ChildModule {}

      class TestCredGuard extends CredGuard {
        getAuthProviders() {
          return this.authProviders
        }
      }

      @Module({
        providers: [TestCredGuard, TokenProvider],
      })
      class AuthModule {}

      const module = await Test.createTestingModule({
        imports: [ChildModule, AuthModule],
      }).compile()

      await module.init()

      const provider = module.get(TestCredGuard)

      expect(provider.getAuthProviders().map((inst) => inst.constructor.name)).toContain('TestProvider')
    })
  })

  describe('Resolve login identity', () => {
    describe('Can resolve with priority', () => {
      let module: TestingModule

      class TestCredGuard extends CredGuard {
        getAuthProviders() {
          return this.authProviders
        }
      }

      beforeAll(async () => {
        @CredAuthTokenProvider(2)
        class TestProvider implements AuthProviderInterface<any> {
          type() {
            return 'test'
          }

          applies(request) {
            return request.custom === true
          }

          async resolve() {
            return {
              custom: true,
            }
          }
        }

        // DefaultProvider, TokenProvider required for import
        @CredAuthTokenProvider(1)
        class TokenProvider implements AuthProviderInterface<any> {
          type() {
            return 'default'
          }

          applies() {
            return true
          }

          async resolve() {
            return {
              custom: false,
            }
          }
        }

        module = await Test.createTestingModule({
          providers: [TestCredGuard, TokenProvider, TestProvider],
        }).compile()

        await module.init()
      })

      it('Can resolve test provider', async () => {
        const provider = module.get(TestCredGuard)

        const request: { [s: string]: any } = {
          custom: true,
        }

        await provider.canActivate({
          switchToHttp: () => ({
            // @ts-ignore
            getRequest: () => {
              return request
            },
          }),
        })

        expect(request.credentials.custom).toBeTruthy()
        expect(request.credentials.type).toBe('test')
      })

      it('Can resolve default provider', async () => {
        const provider = module.get(TestCredGuard)

        const request: { [s: string]: any } = {
          custom: false,
        }

        await provider.canActivate({
          switchToHttp: () => ({
            // @ts-ignore
            getRequest: () => {
              return request
            },
          }),
        })

        expect(request.credentials.custom).toBeFalsy()
        expect(request.credentials.type).toBe('default')
      })
    })
  })
})
