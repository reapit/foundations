/* istanbul ignore file */
// Not possible to test this file without stubbing public keys. Obviously can't include these in the
// project for security reasons and using random strings would be basically worthless as a test.
// Given code comes from AWS, seems reasonable to trust the implementation.
import 'isomorphic-fetch'
import { LoginIdentity } from '../types'
// We wanted to use idtoken-verifier, currently using bashleigh-idtoken-verifier
// as the types are incorrect in root package
import IdTokenVerifier from 'idtoken-verifier'
import decode from 'jwt-decode'

// Util to verify integrity of AWS tokens for client side applications. Allows Connect Session module to check a
// ID Token for validity of claims. See Connect Session for usage, not intended for external users.
// See AWS Docs https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt), code adapted from here.

interface Claim {
  token_use: string
  auth_time: number
  iss: string
  exp: number
  username: string
  client_id: string
}

export type DecodedToken<T extends any> = {
  aud: string
} & T

export const connectSessionVerifyDecodeIdTokenWithPublicKeys = async (
  token: string,
): Promise<LoginIdentity | undefined> => {
  try {
    const decodedToken = decode<DecodedToken<any>>(token)
    const aud: string | string[] = decodedToken.aud

    const verifier = new IdTokenVerifier({
      issuer: decodedToken.iss,
      audience: Array.isArray(aud) ? aud[0] : aud,
      leeway: 300,
    })

    const claim = (await new Promise<Claim>((resolve, reject) =>
      verifier.verify(token, (err: Error | null, payload: object | null) => {
        if (err) {
          reject(err)
        }
        resolve(payload as Claim)
      }),
    )) as Claim
    const currentSeconds = Math.floor(new Date().valueOf() / 1000)

    // Allow 5 minutes to avoid CPU clock latency issues. See: https://github.com/reapit/foundations/issues/2467
    // basically some Windows laptops calculate time not terribly accurately and can be out by as much as 2 or 3 mins
    // based on testing so the currentSeconds are before the auth_time in AWS.
    // Not ideal but prevents constant invalid id_token messages
    if (currentSeconds > claim.exp + 300 || currentSeconds + 300 < claim.auth_time)
      throw new Error('Id verification claim expired')
    if (claim.token_use !== 'id') throw new Error('Id verification claim is not an id token')

    return {
      name: claim['name'],
      email: claim['email'],
      agencyCloudId: claim['custom:reapit:agencyCloudId'] || null,
      developerId: claim['custom:reapit:developerId'] || null,
      clientId: claim['custom:reapit:clientCode'] || null,
      adminId: claim['custom:reapit:marketAdmin'] || null,
      userCode: claim['custom:reapit:userCode'] || null,
      groups: claim['cognito:groups'] || [],
      orgName: claim['custom:reapit:orgName'] || null,
      orgId: claim['custom:reapit:orgId'] || null,
      offGroupIds: claim['custom:reapit:offGroupIds'] || null,
      offGrouping: claim['custom:reapit:offGrouping'] && claim['custom:reapit:offGrouping'] === 'true' ? true : false,
      offGroupName: claim['custom:reapit:offGroupName'] || null,
      officeId: claim['custom:reapit:officeId'] || null,
      orgProduct: claim['custom:reapit:orgProduct'] || null,
    }
  } catch (error) {
    console.error('Reapit Connect Session error:', (error as any).message)
  }
}

export const connectSessionVerifyDecodeIdToken = async (token: string): Promise<LoginIdentity | undefined> => {
  return connectSessionVerifyDecodeIdTokenWithPublicKeys(token)
}
