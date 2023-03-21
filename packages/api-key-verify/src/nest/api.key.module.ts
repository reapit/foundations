import { Module, DynamicModule } from '@nestjs/common'
import {
  API_KEY_INVOKE_CONFIG_PROVIDE,
  AuthModuleOptionsInterface,
  createApiKeyInvokeConfigProvide,
  FactoryArnProvide,
} from './api.key.invoke.config'
import { ApiKeyProvider } from './api.key.provider'

@Module({
  providers: [ApiKeyProvider],
})
export class ApiKeyModule {
  static forRootAsync(options: FactoryArnProvide): DynamicModule {
    return {
      module: ApiKeyModule,
      imports: options.imports || [],
      providers: [createApiKeyInvokeConfigProvide(options), ApiKeyProvider],
      exports: [ApiKeyProvider, API_KEY_INVOKE_CONFIG_PROVIDE],
    }
  }

  static forRoot(options?: AuthModuleOptionsInterface): DynamicModule {
    return {
      module: ApiKeyModule,
      providers: [createApiKeyInvokeConfigProvide(options || { apiKeyInvoke: { enabled: false } }), ApiKeyProvider],
      exports: [ApiKeyProvider, API_KEY_INVOKE_CONFIG_PROVIDE],
    }
  }
}
