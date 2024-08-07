import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda'
import { authorizerHandler } from './../../../ts-scripts/src/authorizer/index'
import * as jwt from 'jsonwebtoken'
import { JwtRsaVerifier, CognitoJwtVerifier } from 'aws-jwt-verify'

const mandatoryScopes = ['agencyCloud/payments.write', 'agencyCloud/payments.read', 'agencyCloud/properties.read']

// I have already validated the access token but add this custom challenge to validate the idToken
// This means I can trust the reapit-customer header in my service whilst caching the authorizer response
// on the resource at a gateway level to ensure it doesn't get too expensive needlessly

// We can remove this and call the user info endpoint when we go live with Auth0 which is the correct way to do it
// we can then remove the requirement for the reapit-id-token header on private endpoints
const customChallenge = async (event: APIGatewayTokenAuthorizerEvent, decodedToken: jwt.Jwt) => {
  const idToken = event['headers']['reapit-id-token']
  const reapitCustomer = event['headers']['reapit-customer']
  const scopes = decodedToken.payload['scope'].split(' ') as string[]

  if (scopes.filter((scope) => mandatoryScopes.includes(scope)).length !== mandatoryScopes.length) {
    // I don't want to try catch as authorizerHandler will handle errors upstream
    throw new Error('Token does not contain mandatory scopes')
  }

  if (!idToken) {
    throw new Error('No idToken provided')
  }

  const decodedIdToken = jwt.decode(idToken, { complete: true })

  if (!decodedIdToken) throw new Error('idToken failed to decode')
  if (typeof decodedIdToken.payload === 'string') throw new Error('Decoded idToken payload is a string')
  if (!decodedIdToken.payload.sub) throw new Error('idToken does not contain a sub')
  if (!decodedIdToken.payload.aud) throw new Error('idToken does not contain an aud')

  const verifier =
    // TODO We can remove this check when we go live with Auth0
    process.env.APP_ENV === 'production'
      ? CognitoJwtVerifier.create({
          userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
          tokenUse: 'id',
          clientId: process.env.COGNITO_CLIENT_ID ?? '',
        })
      : JwtRsaVerifier.create({
          issuer: `${process.env.CONNECT_OAUTH_URL}/`,
          audience: decodedIdToken?.payload.aud,
          jwksUri: `${process.env.CONNECT_OAUTH_URL}/.well-known/jwks.json`,
        })

  const verified = await verifier.verify(idToken)

  if (!verified) throw new Error('idToken failed to verify')

  // This is the crucial part of the check - I validate the idToken so I can trust it then check the reapit-customer
  // header so my downstream services can trust it behind the gateway
  if (reapitCustomer !== verified['custom:reapit:clientCode']) {
    throw new Error('Reapit Customer does not match the decoded idToken')
  }
}

export const handler = authorizerHandler(customChallenge)
