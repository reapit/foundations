import { JwtRsaVerifier, CognitoJwtVerifier } from 'aws-jwt-verify'
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda'
import { authorizerHandler } from '@reapit/utils-authorizer'
import { Jwt, decode } from 'jsonwebtoken'

const mandatoryScopes = ['agencyCloud/payments.write', 'agencyCloud/payments.read', 'agencyCloud/properties.read']

// I have already validated the access token but add this custom challenge to validate the idToken
// This means I can trust the reapit-customer header in my service whilst caching the authorizer response
// on the resource at a gateway level to ensure it doesn't get too expensive needlessly

// We can remove this and call the user info endpoint when we go live with Auth0 which is the correct way to do it
// we can then remove the requirement for the reapit-id-token header on private endpoints
const customChallenge = async (event: APIGatewayTokenAuthorizerEvent, decodedToken: Jwt) => {
  const idToken = event['headers']['reapit-id-token']
  const reapitCustomer = event['headers']['reapit-customer']
  const scopes = decodedToken.payload['scope'].split(' ') as string[]
  const issuers = process.env.ISSUERS?.split(',') || []

  if (scopes.filter((scope) => mandatoryScopes.includes(scope)).length !== mandatoryScopes.length) {
    // I don't want to try catch as authorizerHandler will handle errors upstream
    throw new Error('Token does not contain mandatory scopes')
  }

  if (!idToken) {
    throw new Error('No idToken provided')
  }

  // I am repeating the checks I perform on the access token on the id token with the extra check of the reapit-customer
  // against the clientId in the token
  const issuer = idToken.payload.iss
  const decodedIdToken = decode(idToken, { complete: true })
  if (!decodedIdToken) throw new Error('Id Token failed to decode')
  if (typeof decodedIdToken.payload === 'string') throw new Error('Decoded id token payload is a string')
  if (!decodedIdToken.payload.sub) throw new Error('Id token does not contain a sub')
  // TODO We can remove this check when we go live with Auth0
  // Check against cognito if token provided is valid
  // else check auth0
  if (issuer?.includes('cognito') && issuers.includes(issuer)) {
    const cognitoVerifier = CognitoJwtVerifier.create([
      {
        userPoolId: process.env.CONNECT_USER_POOL ?? '',
        tokenUse: null, // null for both
        // clientId: process.env.CLIENT_ID ?? '',
        clientId: null,
      },
    ])

    const verified = await cognitoVerifier.verify(idToken)

    if (!verified) throw new Error('Token failed to verify')

    // This is the crucial part of the check - I validate the idToken so I can trust it then check the reapit-customer
    // header so my downstream services can trust it behind the gateway
    if (reapitCustomer !== verified.clientId) {
      throw new Error('Reapit Customer does not match the decoded idToken')
    }
  }
  // check the token issuer is within our accepted issuers list which will likely be auth0
  else if (issuer && issuers.includes(issuer)) {
    if (!decodedIdToken.payload.aud) throw new Error('Token does not contain an aud')

    const auth0Verifier = JwtRsaVerifier.create([
      {
        issuer: issuer,
        audience: decodedIdToken?.payload.aud,
        jwksUri: `${issuer.replace(/\/$/, '')}/.well-known/jwks.json`,
      },
    ])

    const verified = await auth0Verifier.verify(idToken)

    if (!verified) throw new Error('Token failed to verify')
    // This is the crucial part of the check - I validate the idToken so I can trust it then check the reapit-customer
    // header so my downstream services can trust it behind the gateway
    if (reapitCustomer !== verified.clientId) {
      throw new Error('Reapit Customer does not match the decoded idToken')
    }
  } else {
    // Token does not contain a valid issuer
    throw new Error(`Invalid issuer [${issuer}]`)
  }
}

export const handler = authorizerHandler(customChallenge)
