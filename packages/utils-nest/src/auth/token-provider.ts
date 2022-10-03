import { Injectable, UnauthorizedException } from '@nestjs/common'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'

@Injectable()
export class TokenProvider {
  async resolve(authorization: string): Promise<LoginIdentity> {
    try {
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
