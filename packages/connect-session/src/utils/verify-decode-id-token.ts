/* istanbul ignore file */
// Not possible to test this file without stubbing public keys. Obviously can't include these in the
// project for security reasons and using random strings would be basically worthless as a test.
// Given code comes from AWS, seems reasonable to trust the implementation.
import 'isomorphic-fetch'
import jsonwebtoken from 'jsonwebtoken'
import jwkToPem, { RSA } from 'jwk-to-pem'
import { LoginIdentity } from '../types'

// Util to verify integrity of AWS tokens for client side applications. Allows Connect Session module to check a
// ID Token for validity of claims. See Connect Session for usage, not intended for external users.
// See AWS Docs https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt), code adapted from here.

interface TokenHeader {
  kid: string
  alg: string
}

interface PublicKey {
  alg: string
  e: string
  kid: string
  kty: string
  n: string
  use: string
}

interface PublicKeyMeta {
  instance: PublicKey
  pem: string
}

interface PublicKeys {
  keys: PublicKey[]
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta
}

interface Claim {
  token_use: string
  auth_time: number
  iss: string
  exp: number
  username: string
  client_id: string
}

let cacheKeys: MapOfKidToPublicKey | undefined

const getPublicKeys = async (token: string): Promise<MapOfKidToPublicKey | undefined> => {
  if (cacheKeys) return cacheKeys

  try {
    const issuer = jsonwebtoken.decode(token, { json: true })?.iss
    if (!issuer) {
      throw new Error('Unable to get issuer from id token')
    }
    const res = await fetch(issuer, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const publicKeys: PublicKeys = await res.json()

    if (!publicKeys) throw new Error('Public keys not returned from Reapit Connect')

    cacheKeys = publicKeys.keys.reduce((agg, current) => {
      const pem = jwkToPem(current as RSA)

      agg[current.kid] = { instance: current, pem }

      return agg
    }, {} as MapOfKidToPublicKey)
    return cacheKeys as MapOfKidToPublicKey
  } catch (error) {
    console.error('Reapit Connect Session error:', error.message)
  }
}

export const connectSessionVerifyDecodeIdTokenWithPublicKeys = async (
  token: string,
  keys: MapOfKidToPublicKey,
): Promise<LoginIdentity | undefined> => {
  try {
    const tokenSections = token.split('.')

    if (tokenSections.length < 2) throw new Error('Id token is invalid')

    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8')

    const header = JSON.parse(headerJSON) as TokenHeader

    const key = keys[header.kid]

    if (!key) throw new Error('Id verification claim made for unknown kid')

    const claim = jsonwebtoken.verify(token, key.pem) as Claim
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
    }
  } catch (error) {
    console.error('Reapit Connect Session error:', error.message)
  }
}

export const connectSessionVerifyDecodeIdToken = async (token: string): Promise<LoginIdentity | undefined> => {
  let keys
  try {
    keys = await getPublicKeys(token)
    if (!keys) {
      if (!keys) throw new Error('Error fetching public keys')
    }
  } catch (error) {
    console.error('Reapit Connect Session error:', error.message)
  }
  return connectSessionVerifyDecodeIdTokenWithPublicKeys(token, keys)
}
