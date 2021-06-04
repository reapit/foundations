import { httpHandler, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { resolveApiKey } from '@reapit/api-key-verify'
import { DataMapper } from '@aws/dynamodb-data-mapper'
import { DynamoDB } from 'aws-sdk'

export const apiKeyAuthorizer = httpHandler({
  handler: async ({ event }): Promise<boolean | never> => {
    if (!event.headers['x-api-key']) {
      throw new UnauthorizedException('Not api key provided')
    }

    const dataMapper = new DataMapper({
      client: new DynamoDB({
        region: 'eu-west-2',
      }),
    })

    try {
      await resolveApiKey(dataMapper)(event.headers['x-api-key'])

      return true
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }
  },
})
