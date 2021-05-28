import { ForbiddenException } from '@homeservenow/serverless-aws-handler'
import { LoginIdentity } from '@reapit/connect-session'

export const ownership = async (developerId: string | undefined, customer: LoginIdentity): Promise<void | never> => {
  if (!developerId || developerId !== customer?.developerId) {
    throw new ForbiddenException()
  }
}
