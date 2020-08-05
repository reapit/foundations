import axios from 'axios'
import { promisify } from 'util'
import jsonwebtoken from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda'

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

const cognitoIssuer = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.CONNECT_USERPOOL_ID}`
const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken))

let cacheKeys: MapOfKidToPublicKey | undefined

const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`
    const publicKeys = await axios.get<PublicKeys>(url)
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current)
      agg[current.kid] = { instance: current, pem }
      return agg
    }, {} as MapOfKidToPublicKey)
    return cacheKeys
  } else {
    return cacheKeys
  }
}

export const connectSessionVerifyHandler: APIGatewayProxyHandler = async (request: APIGatewayProxyEvent) => {
  try {
    if (!request.body) throw new Error('No request body provided for validation of id claim')

    const body = JSON.parse(request.body)
    const { token } = body

    if (!token) throw new Error('Token not provided in rquest for id claim verification')

    const tokenSections = (token || '').split('.')

    if (tokenSections.length < 2) throw new Error('Id token is invalid')

    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8')
    const header = JSON.parse(headerJSON) as TokenHeader
    const keys = await getPublicKeys()
    const key = keys[header.kid]

    if (!key) throw new Error('Id verification claim made for unknown kid')

    const claim = (await verifyPromised(token, key.pem)) as Claim
    const currentSeconds = Math.floor(new Date().valueOf() / 1000)

    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) throw new Error('Id verification claim expired')
    if (claim.iss !== cognitoIssuer) throw new Error('Id verification claim issuer is invalid')
    if (claim.token_use !== 'id') throw new Error('Id verification claim is not an id token')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isValid: true }),
    }
  } catch (error) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isValid: false, error }),
    }
  }
}
