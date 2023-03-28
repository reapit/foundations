import { DynamicModule, Global, Module } from '@nestjs/common'
import { AdminWriteGuard, AdminReadonlyGuard, CredGuard } from './guards'
import { OwnershipProvider } from './ownership-provider'
import { TokenProvider } from './token-provider'

@Module({
  providers: [TokenProvider],
})
@Global()
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      providers: [OwnershipProvider, TokenProvider, CredGuard, AdminWriteGuard, AdminReadonlyGuard],
      exports: [OwnershipProvider, CredGuard, TokenProvider, AdminWriteGuard, AdminReadonlyGuard],
    }
  }

  static forRootAsync(): DynamicModule {
    return {
      module: AuthModule,
      providers: [OwnershipProvider, TokenProvider, CredGuard, AdminWriteGuard, AdminReadonlyGuard],
      exports: [OwnershipProvider, CredGuard, TokenProvider, AdminWriteGuard, AdminReadonlyGuard],
    }
  }
}
