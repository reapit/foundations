import { ApiKeyModel } from '@reapit/api-key-verify'
import { httpHandler, HttpStatusCode, UnauthorizedException } from '@homeservenow/serverless-aws-handler'
import { connectSessionVerifyDecodeIdTokenWithPublicKeys, LoginIdentity } from '@reapit/connect-session'
import { getApiKey as get } from '../services'
import publicKeys from '../../public-keys.json'
import { defaultOutputHeaders } from './../constants'
import { APIGatewayProxyEvent, APIGatewayProxyHandler } from 'aws-lambda'

export const getApiKey = httpHandler<void, ApiKeyModel>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    let customer: LoginIdentity | undefined

    try {
      customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
        event.headers?.Authorization as string,
        process.env.CONNECT_USER_POOL as string,
        publicKeys,
      )

      if (typeof customer === 'undefined' || !customer.developerId) {
        throw new Error('Unauthorised')
      }
    } catch (e) {
      throw new UnauthorizedException(e.message)
    }

    return get({
      id: event.pathParameters?.id,
      developerId: customer?.developerId,
    })
  },
})

export const getApiKeyViaInvoke: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  let customer: LoginIdentity | undefined

  const payload = JSON.parse(event.body || '{}')

  const apiKeyHeader = payload.apiKey

  if (!apiKeyHeader) {
    return {
      body: '',
      statusCode: HttpStatusCode.NOT_FOUND,
    }
  }

  try {
    customer = await connectSessionVerifyDecodeIdTokenWithPublicKeys(
      apiKeyHeader,
      process.env.CONNECT_USER_POOL as string,
      publicKeys,
    )

    if (typeof customer === 'undefined' || !customer.developerId) {
      return {
        body: '',
        statusCode: HttpStatusCode.NOT_FOUND,
      }
    }
  } catch (e) {
    console.error(e)
    return {
      body: '',
      statusCode: HttpStatusCode.NOT_FOUND,
    }
  }

  const apiKey = await get({
    id: event.pathParameters?.id,
    developerId: customer?.developerId,
  })

  return {
    body: JSON.stringify(apiKey),
    statusCode: HttpStatusCode.OK,
  }
}
