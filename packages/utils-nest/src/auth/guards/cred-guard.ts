import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { AuthProviderInterface } from '../auth-provider-interface'
import { ModuleRef, ModulesContainer } from '@nestjs/core'
import { MODULE_METADATA } from '@nestjs/common/constants'
import { TOKEN_PROVIDER_INJECTABLE } from './token.provider.decorator'
import { CredsType } from './cred-types'
import { TokenProvider } from '../token-provider'

@Injectable()
export class CredGuard implements CanActivate {
  protected authProviders: AuthProviderInterface<any>[] = []
  protected tokenProvider: TokenProvider

  constructor(private readonly moduleContainer: ModulesContainer, private readonly moduleRef: ModuleRef) {}

  onModuleInit() {
    const unsortedProviders: { provider: AuthProviderInterface<any>; priority: number }[] = []

    ;[...this.moduleContainer.values()].forEach(({ metatype }) => {
      const metadata = Reflect.getMetadata(MODULE_METADATA.PROVIDERS, metatype)

      if (!metadata) {
        return
      }

      const providers = [...metadata.filter((metatype: any) => typeof metatype === 'function')]

      providers.forEach((provider) => {
        if (Reflect.hasOwnMetadata(TOKEN_PROVIDER_INJECTABLE, provider)) {
          const injectable = this.moduleRef.get(provider, { strict: false })
          if (injectable.constructor.name === TokenProvider.name) {
            this.tokenProvider = injectable
          }
          if (
            !unsortedProviders.find(
              (unsortedProvider) => unsortedProvider.provider.constructor.name === injectable.constructor.name,
            )
          ) {
            const priority = Reflect.getOwnMetadata(TOKEN_PROVIDER_INJECTABLE, provider)
            unsortedProviders.push({
              priority,
              provider: injectable,
            })
            // Logger.log(`added [${injectable.constructor.name}] to CredGuard. Priority [${priority}]`, 'CredGuard')
          }
        }
      })
    })

    if (!this.tokenProvider)
      throw new Error(
        '[TokenProvider] was not found by CredGuard. Please make sure TokenProvider is finable by CredGuard. Likely CredGuard provider is injected outside of AuthModule',
      )

    unsortedProviders.sort((a, b) => b.priority - a.priority)

    this.authProviders = unsortedProviders.map((set) => set.provider)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { credentials?: CredsType }>()

    const providers = this.authProviders.filter((provider) => provider.applies(request))
    const priorityProvider = providers[0] || this.tokenProvider
    // TODO should tokenProvider be instanced here instead of through container? To avoid exceptions in cases where
    // developer breaks usage and creates CredGuard provider without AuthModule

    const credentials = await priorityProvider.resolve(request)

    if (credentials) {
      request.credentials = {
        ...credentials,
        type: priorityProvider.type(),
      }
    }

    return !!credentials
  }
}
