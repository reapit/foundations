import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AccessTokenProvider } from './access-token-provider'
import { CredsType } from './cred-types'
import { CredentialsRequestAppendProvider } from './credentials-request-append-provider'
import { Request } from 'express'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly accessTokenProvider: AccessTokenProvider,
    private readonly credentialsRequestAppendPrvovider: CredentialsRequestAppendProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & { credentials?: CredsType }>()
    const authorization = request.headers?.authorization

    if (!authorization) throw new UnauthorizedException()

    const userInfo = await this.accessTokenProvider.fetchIdentity(authorization)

    this.credentialsRequestAppendPrvovider.appendCredsToRequest(request, userInfo, 'jwt')

    return !!userInfo
  }
}
