import { UnauthorizedException } from '@homeservenow/serverless-aws-handler'

export const authorised = (event: { headers: { [s: string]: any } }): void | never => {
  if (!event.headers || (!event.headers['reapit-connect-token'] && !event.headers['reapit-customer'])) {
    throw new UnauthorizedException()
  }
}

export const authoriseApiKey = (event: { headers: { [s: string]: any } }): void | never => {
  if (!event.headers || !event.headers['X-Api-Key']) {
    throw new UnauthorizedException()
  }
}
