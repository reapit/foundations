import { resolveApiKey } from '@reapit/api-key-verify'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { DynamoDB } from 'aws-sdk'
import { resolveCustomer } from './resolve-customer'
import { IncomingHttpHeaders } from 'http'

export const resolveDeveloperId = async (headers: IncomingHttpHeaders): Promise<string | never> => {
  if (headers['x-api-key']) {
    const dataMapper = new DataMapper({
      client: new DynamoDB({
        region: 'eu-west-2',
      }),
    })

    const apiKey = await resolveApiKey(dataMapper)(headers['x-api-key'] as string)

    return apiKey?.developerId as string
  }

  const customer = await resolveCustomer(headers)

  return customer.developerId as string
}
