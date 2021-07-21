import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { Response } from 'express'

export const ownership = async (
  developerId: string | undefined,
  customerDeveloperId: string,
  response: Response,
): Promise<void | never> => {
  if (!developerId || developerId !== customerDeveloperId) {
    response.status(HttpStatusCode.FORBIDDEN)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send()

    throw new Error('forbidden')
  }
}
