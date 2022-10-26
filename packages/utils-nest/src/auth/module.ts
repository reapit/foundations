import { DynamicModule, Global, Module } from '@nestjs/common'
import { AdminWriteGuard, AdminReadonlyGuard, CredGuard } from './guards'
import {
  API_KEY_INVOKE_CONFIG_PROVIDE,
  AuthModuleOptionsInterface,
  createApiKeyInvokeConfigProvide,
  FactoryArnProvide,
} from './api-key-invoke-config'
import { ApiKeyProvider } from './api-key-provider'
import { OwnershipProvider } from './ownership-provider'
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
        AdminWriteGuard,
        AdminReadonlyGuard,
        createApiKeyInvokeConfigProvide(options || { apiKeyInvoke: { enabled: false } }),
      ],
      exports: [
        OwnershipProvider,
        CredGuard,
        TokenProvider,
        ApiKeyProvider,
        AdminWriteGuard,
        AdminReadonlyGuard,
        API_KEY_INVOKE_CONFIG_PROVIDE,
      ],
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
        AdminWriteGuard,
        AdminReadonlyGuard,
        createApiKeyInvokeConfigProvide(options),
      ],
      exports: [
        OwnershipProvider,
        CredGuard,
        TokenProvider,
        ApiKeyProvider,
        AdminWriteGuard,
        AdminReadonlyGuard,
        API_KEY_INVOKE_CONFIG_PROVIDE,
      ],
    }
  }
}
