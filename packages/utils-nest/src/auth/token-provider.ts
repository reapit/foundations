import { UnauthorizedException } from '@nestjs/common'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { Request } from 'express'
import { AuthProviderInterface } from './auth-provider-interface'
import { CredAuthTokenProvider } from './guards'

@CredAuthTokenProvider(1)
export class TokenProvider implements AuthProviderInterface<any> {
  applies() {
    return true
  }

  type() {
    return 'jwt'
  }

  async resolve(request: Request): Promise<LoginIdentity> {
    try {
      const authorization = request.headers?.authorization as string
      const claim = await connectSessionVerifyDecodeIdTokenWithPublicKeys(authorization)

      if (!claim) {
        throw new Error('unauthorised')
      }

      return claim
    } catch (e) {
      throw new UnauthorizedException(String(e))
    }
  }
}
