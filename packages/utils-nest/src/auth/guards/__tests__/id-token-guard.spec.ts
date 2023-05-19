import { AuthProviderInterface } from '../../auth-provider-interface'
import { IdTokenProvider } from '../../id-token-provider'
import { Test, TestingModule } from '@nestjs/testing'
import { IdTokenGuard } from '../id-token-guard'
import { CredAuthTokenProvider } from '../../token.provider.decorator'
import { Module } from '@nestjs/common'

describe('IdTokenGuard', () => {
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

      class TestCredGuard extends IdTokenGuard {
        getAuthProviders() {
          return this.authProviders
        }
      }

      const module = await Test.createTestingModule({
        providers: [TestProvider, AnotherTestProvider, TestCredGuard, IdTokenProvider],
      }).compile()

      await module.init()

      const provider = module.get(TestCredGuard)

      provider.getAuthProviders().forEach((inst) => {
        expect(['TestProvider', 'AnotherTestProvider', 'IdTokenProvider'].includes(inst.constructor.name)).toBeTruthy()
      })
    })

    it('IdTokenGuard will find all AuthProviders in different modules', async () => {
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

      class TestCredGuard extends IdTokenGuard {
        getAuthProviders() {
          return this.authProviders
        }
      }

      @Module({
        providers: [TestCredGuard, IdTokenProvider],
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

      class TestCredGuard extends IdTokenGuard {
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

        // DefaultProvider, IdTokenProvider required for import
        @CredAuthTokenProvider(1)
        class IdTokenProvider implements AuthProviderInterface<any> {
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
          providers: [TestCredGuard, IdTokenProvider, TestProvider],
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
