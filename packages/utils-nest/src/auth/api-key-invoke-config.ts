import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Provider } from '@nestjs/common'

export const API_KEY_INVOKE_CONFIG_PROVIDE = 'API_KEY_INVOKE_CONFIG_PROVIDE'

export type StringArnProvide = { invokeArn: string }

export interface FactoryArnProvide extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => string | Promise<string>
  inject?: Array<InjectionToken | OptionalFactoryDependency>
}

const optionsAreString = (options: StringArnProvide | FactoryArnProvide): options is StringArnProvide =>
  'invokeArn' in options

export const createApiKeyInvokeConfigProvide = (options: StringArnProvide | FactoryArnProvide): Provider => {
  return optionsAreString(options)
    ? {
        provide: API_KEY_INVOKE_CONFIG_PROVIDE,
        useValue: options.invokeArn,
      }
    : {
        provide: API_KEY_INVOKE_CONFIG_PROVIDE,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
}
