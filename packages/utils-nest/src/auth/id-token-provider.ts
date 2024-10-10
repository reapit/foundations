import { UnauthorizedException } from '@nestjs/common'
import { verifyIdToken, LoginIdentity } from '@reapit/connect-session-server'
import { Request } from 'express'
import { AuthProviderInterface } from './auth-provider-interface'
import { CredAuthTokenProvider } from './token.provider.decorator'

@CredAuthTokenProvider(1)
export class IdTokenProvider implements AuthProviderInterface<any> {
  applies() {
    return true
  }

  type() {
    return 'jwt'
  }

  async resolve(request: Request): Promise<LoginIdentity> {
    try {
      const authorization = request.headers?.authorization

      if (!authorization) throw new UnauthorizedException('Authorization header not found')

      const claim = await verifyIdToken(authorization.replace('Bearer ', ''))

      if (!claim) {
        throw new Error('unauthorised')
      }

      return claim
    } catch (e) {
      throw new UnauthorizedException(String(e))
    }
  }
}
