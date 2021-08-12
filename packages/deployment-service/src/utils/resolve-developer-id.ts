import { resolveApiKey } from '@reapit/api-key-verify'
import { resolveCustomer } from './resolve-customer'
import { APIGatewayEvent } from 'aws-lambda'

export type Creds = {
  developerId: string
  clientCode: string
}

export const resolveCreds = async (event: APIGatewayEvent): Promise<Creds | never> => {
  if (event.headers['x-api-key']) {
    const apiKey = await resolveApiKey(event.headers['x-api-key'])

    return {
      developerId: apiKey?.developerId as string,
      clientCode: apiKey?.clientCode as string,
    }
  }

  const customer = await resolveCustomer(event)

  return {
    developerId: customer.developerId as string,
    clientCode: customer.clientId as string,
  }
}
