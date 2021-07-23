import { resolveApiKey } from '@reapit/api-key-verify'
import { resolveCustomer } from './resolve-customer'
import { IncomingHttpHeaders } from 'http'
import { Response } from 'express'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'

export const resolveDeveloperId = async (headers: IncomingHttpHeaders, response: Response): Promise<string | never> => {
  if (!headers['x-api-key'] && !headers.authorization) {
    response.status(HttpStatusCode.UNAUTHORIZED)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send('No authorisation method present')

    throw new Error('no auth method')
  }

  if (headers['x-api-key']) {
    try {
      const apiKey = await resolveApiKey(headers['x-api-key'] as string)
      return apiKey?.developerId as string
    } catch (e) {
      response.status(HttpStatusCode.UNAUTHORIZED)
      response.setHeader('Access-Control-Allow-Origin', '*')
      response.send(e.message)

      throw e
    }
  }

  try {
    const customer = await resolveCustomer(headers)
    return customer.developerId as string
  } catch (e) {
    response.status(HttpStatusCode.UNAUTHORIZED)
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.send(e.message)

    throw e
  }
}
