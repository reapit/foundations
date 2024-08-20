import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda'
import * as jwt from 'jsonwebtoken'
import { JwtRsaVerifier, CognitoJwtVerifier } from 'aws-jwt-verify'

export const authorizerHandler =
  (customChallenge?: (event: APIGatewayTokenAuthorizerEvent, decodedToken: jwt.Jwt) => Promise<void | Error>) =>
  async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    try {
      const issuers = process.env.ISSUERS.split(',')
      const headers = event['headers']

      const authorization = headers.authorization || headers.Authorization

      if (!authorization) throw new Error('No authorization header provided')

      const token = authorization.replace('Bearer ', '')

      const decodedToken = jwt.decode(token, { complete: true })

      if (!decodedToken) throw new Error('Token failed to decode')
      if (typeof decodedToken.payload === 'string') throw new Error('Decoded token payload is a string')
      if (!decodedToken.payload.sub) throw new Error('Token does not contain a sub')
      const iss = decodedToken.payload.iss

      if (iss?.includes('cognito') && issuers.includes(iss)) {
        const cognitoVerifier = CognitoJwtVerifier.create([
          {
            userPoolId: process.env.CONNECT_USER_POOL ?? '',
            tokenUse: 'access',
            clientId: process.env.CLIENT_ID ?? '',
          },
        ])

        const cognitoVerified = await cognitoVerifier.verify(token)

        if (!cognitoVerified) throw new Error('Token failed to verify')
      } else if (iss?.includes('auth0') && issuers.includes(iss)) {
        if (!decodedToken.payload.aud) throw new Error('Token does not contain an aud')

        const auth0Verifier = JwtRsaVerifier.create([
          {
            issuer: iss,
            audience: decodedToken?.payload.aud,
            jwksUri: `${iss}/.well-known/jwks.json`,
          },
        ])

        const auth0Verified = auth0Verifier.verify(token)

        if (!auth0Verified) throw new Error('Token failed to verify')
      } else {
        throw new Error(`Invalid issuer [${iss}]`)
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
