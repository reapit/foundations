import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ApiKeyProvider } from './api-key-provider'
import { TokenProvider } from './token-provider'
import { Request } from 'express'
import { LoginIdentity } from '@reapit/connect-session'
import { ApiKeyModel } from '@reapit/api-key-verify'

type LoginCredsType = {
  type: 'jwt'
} & LoginIdentity

type ApiKeyCredsType = {
  type: 'api-key'
} & Omit<ApiKeyModel, 'expired'>

export type CredsType = LoginCredsType | ApiKeyCredsType

@Injectable()
export class CredGuard implements CanActivate {
  constructor(private readonly tokenProvider: TokenProvider, private readonly apiKeyProvider: ApiKeyProvider) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request & { credentials?: CredsType }>()

    if (Object.keys(request.headers).includes('x-api-key')) {
      const apiKeyCreds = await this.apiKeyProvider.resolve(request.headers['x-api-key'] as string)

      if (apiKeyCreds) {
        request.credentials = {
          ...apiKeyCreds,
          type: 'api-key',
        }
      }

      return !!apiKeyCreds
    }

    const tokenCreds = await this.tokenProvider.resolve(request.headers?.authorization as string)

    if (!tokenCreds || !tokenCreds.developerId) return false

    if (tokenCreds) {
      request.credentials = {
        ...tokenCreds,
        type: 'jwt',
      }
    }

    return !!tokenCreds
  }
}
