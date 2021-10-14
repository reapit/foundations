import { UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { LoginIdentity } from '@reapit/connect-session'
// import publicKeys from './../../public-keys.json'
import { APIGatewayEvent } from 'aws-lambda'
import decode from 'jwt-decode'

export const resolveCustomer = async (event: APIGatewayEvent): Promise<LoginIdentity | never> => {
  let customer: LoginIdentity | undefined

  try {
    customer = decode(event.headers.Authorization as string)

    if (!customer) {
      throw new Error('unauthorised')
    }
  } catch (e) {
    throw new UnauthorizedException(String(e))
  }

  return customer
}
