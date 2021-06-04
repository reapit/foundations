import { ForbiddenException } from '@homeservenow/serverless-aws-handler'

export const ownership = async (
  developerId: string | undefined,
  customerDeveloperId: string,
): Promise<void | never> => {
  if (!developerId || developerId !== customerDeveloperId) {
    throw new ForbiddenException()
  }
}
