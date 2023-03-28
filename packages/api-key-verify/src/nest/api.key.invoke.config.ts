import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Provider } from '@nestjs/common'

export const API_KEY_INVOKE_CONFIG_PROVIDE = 'API_KEY_INVOKE_CONFIG_PROVIDE'

export interface ApiKeyVerifyModuleOptionsInterface {
  apiKeyInvoke: {
    enabled: boolean
    invokeArn?: string
  }
}

export interface FactoryArnProvide extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => ApiKeyVerifyModuleOptionsInterface | Promise<ApiKeyVerifyModuleOptionsInterface>
  inject?: Array<InjectionToken | OptionalFactoryDependency>
}

const optionsAreProvide = (
  options: ApiKeyVerifyModuleOptionsInterface | FactoryArnProvide,
): options is FactoryArnProvide => 'useFactory' in options

export const createApiKeyInvokeConfigProvide = (
  options: ApiKeyVerifyModuleOptionsInterface | FactoryArnProvide,
): Provider => {
  return optionsAreProvide(options)
    ? {
        provide: API_KEY_INVOKE_CONFIG_PROVIDE,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    : {
        provide: API_KEY_INVOKE_CONFIG_PROVIDE,
        useValue: options,
      }
}
