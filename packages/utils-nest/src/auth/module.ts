import {
  DynamicModule,
  ForwardReference,
  Global,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
  Type,
} from '@nestjs/common'
import { AdminWriteGuard, AdminReadonlyGuard, IdTokenGuard } from './guards'
import { OwnershipProvider } from './ownership-provider'
import { IdTokenProvider } from './id-token-provider'
import { AccessTokenGuard } from './guards/access-token-guard'
import { AccessTokenProvider, AccessTokenProviderConfigInterface } from './guards/access-token-provider'
import { ACCESS_TOKEN_PROVIDER_CONFIG_PROVIDE } from './consts'
import { CredentialsRequestAppendProvider } from './guards/credentials-request-append-provider'

@Module({
  providers: [
    OwnershipProvider,
    IdTokenProvider,
    IdTokenGuard,
    AdminWriteGuard,
    AdminReadonlyGuard,
    AccessTokenGuard,
    AccessTokenProvider,
    CredentialsRequestAppendProvider,
  ],
  exports: [
    OwnershipProvider,
    IdTokenGuard,
    IdTokenProvider,
    AdminWriteGuard,
    AdminReadonlyGuard,
    AccessTokenGuard,
    AccessTokenProvider,
    CredentialsRequestAppendProvider,
  ],
})
@Global()
export class AuthModule {
  static forRootAsync(options: {
    useFactory: (...args: any[]) => AccessTokenProviderConfigInterface | Promise<AccessTokenProviderConfigInterface>
    inject?: Array<InjectionToken | OptionalFactoryDependency>
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>
  }): DynamicModule {
    return {
      module: AuthModule,
      imports: [...(options.imports || [])],
      providers: [
        {
          provide: ACCESS_TOKEN_PROVIDER_CONFIG_PROVIDE,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        OwnershipProvider,
        IdTokenGuard,
        IdTokenProvider,
        AdminWriteGuard,
        AdminReadonlyGuard,
        AccessTokenGuard,
        AccessTokenProvider,
        CredentialsRequestAppendProvider,
      ],
      exports: [
        ACCESS_TOKEN_PROVIDER_CONFIG_PROVIDE,
        OwnershipProvider,
        IdTokenGuard,
        IdTokenProvider,
        AdminWriteGuard,
        AdminReadonlyGuard,
        AccessTokenGuard,
        AccessTokenProvider,
        CredentialsRequestAppendProvider,
      ],
    }
  }
}
