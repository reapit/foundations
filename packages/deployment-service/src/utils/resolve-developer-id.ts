import { resolveApiKey } from '@reapit/api-key-verify'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { DynamoDB } from 'aws-sdk'
import { resolveCustomer } from './resolve-customer'
import { APIGatewayEvent } from 'aws-lambda'

export const resolveDeveloperId = async (event: APIGatewayEvent): Promise<string | never> => {
  if (event.headers['x-api-key']) {
    const dataMapper = new DataMapper({
      client: new DynamoDB({
        region: 'eu-west-2',
      }),
    })

    const apiKey = await resolveApiKey(dataMapper)(event.headers['x-api-key'])

    return apiKey?.developerId as string
  }

  const customer = await resolveCustomer(event)

  return customer.developerId as string
}
