import {Module} from '@nestjs/common'
import { ApiKeyProvider } from './api-key-provider'
import { OwnershipProvider } from './ownership'
import { TokenProvider } from './token-provider'

@Module({
  providers: [
    OwnershipProvider,
    ApiKeyProvider,
    TokenProvider,
  ],
  exports: [
    OwnershipProvider,
  ],
})
export class AuthModule {}
