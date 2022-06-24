import { DynamicModule, Global, Module } from '@nestjs/common'
import {
  API_KEY_INVOKE_CONFIG_PROVIDE,
  createApiKeyInvokeConfigProvide,
  FactoryArnProvide,
  StringArnProvide,
} from './api-key-invoke-config'
import { ApiKeyProvider } from './api-key-provider'
import { CredGuard } from './cred-guard'
import { OwnershipProvider } from './ownership'
import { TokenProvider } from './token-provider'

@Module({})
@Global()
export class AuthModule {
  static forRoot(options: StringArnProvide): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        OwnershipProvider,
        ApiKeyProvider,
        TokenProvider,
        CredGuard,
        createApiKeyInvokeConfigProvide(options),
      ],
      exports: [OwnershipProvider, CredGuard, TokenProvider, ApiKeyProvider, API_KEY_INVOKE_CONFIG_PROVIDE],
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
        createApiKeyInvokeConfigProvide(options),
      ],
      exports: [OwnershipProvider, CredGuard, TokenProvider, ApiKeyProvider, API_KEY_INVOKE_CONFIG_PROVIDE],
    }
  }
}
