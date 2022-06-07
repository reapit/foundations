import { Module } from '@nestjs/common'
import { ApiKeyProvider } from './api-key-provider'
import { CredGuard } from './cred-guard'
import { OwnershipProvider } from './ownership'
import { TokenProvider } from './token-provider'

@Module({
  providers: [OwnershipProvider, ApiKeyProvider, TokenProvider, CredGuard],
  exports: [OwnershipProvider, CredGuard, TokenProvider, ApiKeyProvider],
})
export class AuthModule {}
