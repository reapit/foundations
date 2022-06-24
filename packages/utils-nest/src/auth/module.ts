import { DynamicModule, Global, Module } from '@nestjs/common'
import { AdminGuard } from './admin-guard'
import {
  API_KEY_INVOKE_CONFIG_PROVIDE,
  AuthModuleOptionsInterface,
  createApiKeyInvokeConfigProvide,
  FactoryArnProvide,
} from './api-key-invoke-config'
import { ApiKeyProvider } from './api-key-provider'
import { CredGuard } from './cred-guard'
import { OwnershipProvider } from './ownership'
import { TokenProvider } from './token-provider'

@Module({})
@Global()
export class AuthModule {
  static forRoot(options?: AuthModuleOptionsInterface): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        OwnershipProvider,
        ApiKeyProvider,
        TokenProvider,
        CredGuard,
        AdminGuard,
        createApiKeyInvokeConfigProvide(options || { apiKeyInvoke: { enabled: false } }),
      ],
      exports: [OwnershipProvider, CredGuard, TokenProvider, ApiKeyProvider, AdminGuard, API_KEY_INVOKE_CONFIG_PROVIDE],
    }
  }

  static forRootAsync(options: FactoryArnProvide): DynamicModule {
    return {
      module: AuthModule,
      imports: options.imports || [],
      providers: [
        OwnershipProvider,
        ApiKeyProvider,
        TokenProvider,
        CredGuard,
        AdminGuard,
        createApiKeyInvokeConfigProvide(options),
      ],
      exports: [OwnershipProvider, CredGuard, TokenProvider, ApiKeyProvider, AdminGuard, API_KEY_INVOKE_CONFIG_PROVIDE],
    }
  }
}
