import { UnauthorizedException } from '@homeservenow/serverless-aws-handler'

export const authorised = (event: { headers: { [s: string]: any } }): void | never => {
  if (!event.headers || !event.headers['x-api-key']) {
    throw new UnauthorizedException()
  }
}
