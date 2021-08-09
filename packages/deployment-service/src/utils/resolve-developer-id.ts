import { resolveApiKey } from '@reapit/api-key-verify'
import { resolveCustomer } from './resolve-customer'
import { APIGatewayEvent } from 'aws-lambda'

export const resolveDeveloperId = async (event: APIGatewayEvent): Promise<string | never> => {
  if (event.headers['x-api-key']) {

    const apiKey = await resolveApiKey(event.headers['x-api-key'])

    return apiKey?.developerId as string
  }

  const customer = await resolveCustomer(event)

  return customer.developerId as string
}
