import { ForbiddenException } from '@homeservenow/serverless-aws-handler'

export const ownership = (developerId: string | undefined, customerDeveloperId: string): void | never => {
  if (!developerId || developerId !== customerDeveloperId) {
    throw new ForbiddenException()
  }
}
