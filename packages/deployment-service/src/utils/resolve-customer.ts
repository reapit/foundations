import { UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { LoginIdentity } from '@reapit/connect-session'
import { APIGatewayEvent } from 'aws-lambda'
import decode from 'jwt-decode'

export const resolveCustomer = async (event: APIGatewayEvent): Promise<LoginIdentity | never> => {
  let customer: LoginIdentity | undefined

  try {
    const claim = decode<Partial<LoginIdentity> & {[s: string]: string}>(event.headers.Authorization as string)

    if (!claim) {
      throw new Error('unauthorised')
    }

    customer = {
      ...claim,
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
    } as LoginIdentity
  } catch (e) {
    throw new UnauthorizedException(String(e))
  }

  return customer
}
