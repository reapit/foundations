import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from 'aws-lambda'
import * as jwt from 'jsonwebtoken'
import { JwtRsaVerifier, CognitoJwtVerifier } from 'aws-jwt-verify'

export const authorizerHandler =
  (customChallenge?: (event: APIGatewayTokenAuthorizerEvent, decodedToken: jwt.Jwt) => Promise<void | Error>) =>
  async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    try {
      if (!event['headers'].authorization) throw new Error('No authorization header provided')

      const token = event['headers'].authorization.split('Bearer ')[1]

      if (!token) throw new Error('Token is not a bearer token')

      const decodedToken = jwt.decode(token, { complete: true })

      if (!decodedToken) throw new Error('Token failed to decode')
      if (typeof decodedToken.payload === 'string') throw new Error('Decoded token payload is a string')
      if (!decodedToken.payload.sub) throw new Error('Token does not contain a sub')
      if (!decodedToken.payload.aud) throw new Error('Token does not contain an aud')

      const verifier =
        // TODO We can remove this check when we go live with Auth0
        process.env.APP_ENV === 'production'
          ? CognitoJwtVerifier.create({
              userPoolId: process.env.COGNITO_USER_POOL_ID ?? '',
              tokenUse: 'access',
              clientId: process.env.COGNITO_CLIENT_ID ?? '',
            })
          : JwtRsaVerifier.create({
              issuer: `${process.env.CONNECT_OAUTH_URL}/`,
              audience: decodedToken?.payload.aud,
              jwksUri: `${process.env.CONNECT_OAUTH_URL}/.well-known/jwks.json`,
            })

      const verified = await verifier.verify(token)

      if (!verified) throw new Error('Token failed to verify')

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
