import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda'
import * as jwt from 'jsonwebtoken'
import { JwtRsaVerifier, CognitoJwtVerifier } from 'aws-jwt-verify'

/**
   * A Custom function for checking against the token. Throwing will result in 401
   * 
   * @param event APIGatewayTokenAuthorizerEvent
   * @param decodedToken JWT
   * @returns void | Error
   */
type CustomChallenge = (event: APIGatewayTokenAuthorizerEvent, decodedToken: jwt.Jwt) => Promise<void | Error>

/**
 * Check provided token against cognito and auth0. This is a wrapper function to be called as `authorizerHandler()()`
 * 
 * @param customChallenge 
 * @returns APIGatewayAuthorizerResult
 */
export const authorizerHandler =
  (customChallenge?: CustomChallenge) =>
  async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    try {
      const headers = event['headers']
      const issuers = process.env.ISSUERS?.split(',') || []

      // case insensitive
      const authorization = headers.authorization || headers.Authorization

      if (!authorization) throw new Error('No authorization header provided')

      const token = authorization.replace('Bearer ', '')

      if (!token) throw new Error('Token is not a bearer token')

      const decodedToken = jwt.decode(token, { complete: true })

      if (!decodedToken) throw new Error('Token failed to decode')
      if (typeof decodedToken.payload === 'string') throw new Error('Decoded token payload is a string')
      if (!decodedToken.payload.sub) throw new Error('Token does not contain a sub')

      const issuer = decodedToken.payload.iss

      // TODO We can remove this check when we go live with Auth0
      // Check against cognito if token provided is valid
      // else check auth0
      if (issuer?.includes('cognito') && issuers.includes(issuer)) {
        const cognitoVerifier = CognitoJwtVerifier.create({
          userPoolId: process.env.CONNECT_USER_POOL ?? '',
          tokenUse: 'access',
          clientId: process.env.CLIENT_ID ?? '',
        })

        const verified = await cognitoVerifier.verify(token)

        if (!verified) throw new Error('Token failed to verify')
      }
      // check the token issuer is within our accepted issuers list which will likely be auth0
      else if (issuer && issuers.includes(issuer)) {
        if (!decodedToken.payload.aud) throw new Error('Token does not contain an aud')

        const auth0Verifier = JwtRsaVerifier.create([
          {
            issuer: issuer,
            audience: decodedToken?.payload.aud,
            jwksUri: `${issuer.replace(/\/$/, '')}/.well-known/jwks.json`,
          },
        ])

        const verified = await auth0Verifier.verify(token)

        if (!verified) throw new Error('Token failed to verify')
      } else {
        // Token does not contain a valid issuer
        throw new Error(`Invalid issuer [${issuer}]`)
      }

      // Allows us to pass in any other relevant challenges beyone the standard access token verification
      if (customChallenge) {
        await customChallenge(event, decodedToken)
      }

      return {
        principalId: decodedToken.payload.sub,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Allow',
              Resource: event.methodArn,
            },
          ],
        },
      }
    } catch (error) {
      console.error('Error:', error)
      return {
        principalId: 'user',
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Effect: 'Deny',
              Resource: event.methodArn,
            },
          ],
        },
      }
    }
  }
