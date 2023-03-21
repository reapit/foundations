import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Provider } from '@nestjs/common'

export const API_KEY_INVOKE_CONFIG_PROVIDE = 'API_KEY_INVOKE_CONFIG_PROVIDE'

export interface AuthModuleOptionsInterface {
  apiKeyInvoke: {
    enabled: boolean
    invokeArn?: string
  }
}

export interface FactoryArnProvide extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => AuthModuleOptionsInterface | Promise<AuthModuleOptionsInterface>
  inject?: Array<InjectionToken | OptionalFactoryDependency>
}

const optionsAreProvide = (options: AuthModuleOptionsInterface | FactoryArnProvide): options is FactoryArnProvide =>
  'useFactory' in options

export const createApiKeyInvokeConfigProvide = (options: AuthModuleOptionsInterface | FactoryArnProvide): Provider => {
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
