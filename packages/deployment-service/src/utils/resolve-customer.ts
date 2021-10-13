import { UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
// import publicKeys from './../../public-keys.json'
import { APIGatewayEvent } from 'aws-lambda'

export const resolveCustomer = async (event: APIGatewayEvent): Promise<LoginIdentity | never> => {
  let customer: LoginIdentity | undefined

  try {
    customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
      event.headers['Authorization'] as string,
      process.env.CONNECT_USER_POOL as string,
      // publicKeys,
    )

    if (!customer) {
      throw new Error('unauthorised')
    }
  } catch (e) {
    throw new UnauthorizedException(e.message)
  }

  return customer
}
